"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ProfileCard from "./ProfileCard";
import { Post } from "@types";



const Profile = () => {

	const router = useRouter();
	const { data: session, status } = useSession();

	const [myPosts, setMyPosts] = useState<Post[]>([]);

	useEffect(() => {

		if (status === "loading") return;

		if (status !== "authenticated") {
			router.push('/');
			return;
		}

		const fetchPosts = async () => {

			if (!session?.user?.id) return;

			try {
				const response = await fetch(`/api/users/${session.user.id}/posts`);

				if (!response.ok) {
					throw new Error(`[Profile.jsx/fetchPosts()](${new Date().toISOString()}) => API call failed with status ${response.status}: ${await response.text()}`);
				}

				const data = await response.json();
	
				setMyPosts(data);
				
			} catch (error) {
				setMyPosts([])
			}

		};

		fetchPosts();

	}, [session?.user?.id, status]);




	return (
		<section className='w-full'>
			<h1 className='head_text text-left'>
				<span className='green_gradient2'>My Profile</span>
			</h1>
			<p className='desc text-left'>Welcome to your personalized profile page. Here, you can create and manage your AI conversation capsules, designed for easy reference and personal organization.</p>

			<div className='mt-10 profile_layout'>
				{myPosts.map((post: Post) => (
					<ProfileCard
						myPosts={myPosts}
						setMyPosts={setMyPosts}
						key={post._id}
						post={post}
					/>
				))}
			</div>
		</section>
	);
};

export default Profile;
