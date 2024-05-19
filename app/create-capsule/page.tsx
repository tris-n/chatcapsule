"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateCapsule = () => {
	const router = useRouter();
	const { data: session, status } = useSession();

	const [submitting, setIsSubmitting] = useState(false);
	const [post, setPost] = useState({ url: "", title: "", summary: "", tag: "" });

	useEffect(() => {

		if (status === "loading") return;

		if (status !== "authenticated") {
			router.push('/');
			return;
		}

	}, [status, router]);

	const createCapsule = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsSubmitting(true);

		try {
			const response = await fetch("/api/capsule/new", {
				method: "POST",
				headers: {
                    'Content-Type': 'application/json',
                },
				body: JSON.stringify({
					userId: session?.user.id,
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
			console.log(`Error creating Capsule`, error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form
			type='Create'
			post={post}
			setPost={setPost}
			submitting={submitting}
			handleSubmit={createCapsule}
		/>
	);
};

export default CreateCapsule; 