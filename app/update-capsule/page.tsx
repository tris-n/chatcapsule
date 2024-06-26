"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import Spinner from "@components/Spinner";



const UpdateCapsule = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const searchParams = useSearchParams();
	const capsuleId = searchParams.get("id");

	const [isLoading, setIsLoading] = useState(false);
	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({ url: "", title: "", summary: "", tag: "" });


	useEffect(() => {

		if (!capsuleId) {
			router.push('/');
			return;
		}

		if (status === "loading") return;

		if (status !== "authenticated") {
			router.push('/');
			return;
		}

		setIsLoading(true);

		const getCapsuleDetails = async () => {

			try {
				
				const response = await fetch(`/api/capsule/${capsuleId}`);
				const data = await response.json();

				// if no user id
				if (!session?.user?.id) return;
				
				// if user id doesnt match the user.id
				if (session?.user?.id !== data.creator._id) {
					router.push('/');
					return;
				}

				setPost({
					url: data.url,
					title: data.title,
					summary: data.summary,
					tag: data.tag,
				});
				
			} catch (error) {
				console.error('Failed to fetch capsule details:', error);
			} finally {
				setIsLoading(false);
			}

		};

		getCapsuleDetails();

	}, [session?.user.id, capsuleId, status]);

	const updateCapsule = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		if (!capsuleId) return alert("Missing CapsuleId!");

		try {
			const response = await fetch(`/api/capsule/${capsuleId}`, {
				method: "PATCH",
				headers: {
                    'Content-Type': 'application/json',
                },
				body: JSON.stringify({
					url: post.url,
					title: post.title,
					summary: post.summary,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(`Error updating Capsule`, error);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (isLoading) {
		return (
			<Spinner />
		)
	}

	return (
		<Form
			type='Edit'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={updateCapsule}
		/>
	);
};

const UpdatePage = () => {
	return (
		<Suspense fallback={<Spinner />}>
			<UpdateCapsule />
		</Suspense>
	)
}

export default UpdatePage;