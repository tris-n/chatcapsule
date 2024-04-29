"use client";

import { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";


// The actual form. Have to put it in a separate component so we can check if its loaded before displaying it. https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
const UpdateForm = () => {
	const router = useRouter();
	const { data: session, status } = useSession();
	const searchParams = useSearchParams();
	const capsuleId = searchParams.get("id");

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

		const getCapsuleDetails = async () => {
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
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

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

const UpdateCapsule = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<UpdateForm />
		</Suspense>
	)
}

export default UpdateCapsule;