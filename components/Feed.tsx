"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CapsuleCard from "@components/CapsuleCard";
import { Post } from "@types"



const Feed = () => {
	// const router = useRouter();
	const { data: session, status } = useSession();

	const [myPosts, setMyPosts] = useState<Post[]>([]);

	// Search states
	const [searchText, setSearchText] = useState("");
	const [searchTimeout, setSearchTimeout] = useState<number | undefined>(undefined);
	const [searchedResults, setSearchedResults] = useState<Post[]>([]);

	useEffect(() => {

		const fetchPosts = async () => {
			try {
				const response = await fetch(`/api/users/${session?.user.id}/posts`);

				if (!response.ok) {
					throw new Error(`[Feed.jsx/fetchPosts()](${new Date().toISOString()}) => API call failed with status ${response.status}: ${await response.text()}`);
				}

				const data = await response.json();
	
				setMyPosts(data);
			} catch (error) {
				setMyPosts([])
			}
		};

		if (session?.user.id) fetchPosts();
	}, [session?.user.id]);

	const filterCapsules = (searchtext: string) => {
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		return myPosts.filter(
			(item: Post) =>
				regex.test(item.title) ||
				regex.test(item.tag) ||
				regex.test(item.summary)
		);
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		clearTimeout(searchTimeout);
		setSearchText(event.target.value);

		// debounce method
		const timeoutId = window.setTimeout(() => {
			const searchResult = filterCapsules(event.target.value);
			setSearchedResults(searchResult);
		}, 500);
		setSearchTimeout(timeoutId);
	};

	const handleTagClick = (tagName: string) => {
		setSearchText(tagName);

		const searchResult = filterCapsules(tagName);
		setSearchedResults(searchResult);
	};

	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='head_text text-center'>
				Capture & Organize
				<br className='max-md:hidden' />
				<span className='green_gradient text-center'>Your AI Conversations</span>
			</h1>
			<p className='desc text-center'>
				ChatCapsule is an intuitive platform that allows you to save, summarize, and tag your ChatGPT conversations for easy searchability and future reference.
			</p>

			{/* <Feed /> */}
			<section className='feed'>

				{/* Search Bar */}
				{status === "authenticated" && (
					<form className='relative w-full flex-center'>
						<input
						type='text'
						placeholder='Search your capsules'
						value={searchText}
						onChange={handleSearchChange}
						required
						className='search_input peer'
						/>
					</form>
				)}

				{/* All Capsules */}
				<div className='mt-16 capsule_layout'>
					{searchText ? (
						searchedResults.map((post: Post) => (
							<CapsuleCard
								key={post._id}
								post={post}
								handleTagClick={handleTagClick}
								myPosts={myPosts}
								setMyPosts={setMyPosts}
								searchedResults={searchedResults}
								setSearchedResults={setSearchedResults}
							/>
						))
					):(
						myPosts.map((post: Post) => (
							<CapsuleCard
								key={post._id}
								post={post}
								handleTagClick={handleTagClick}
								myPosts={myPosts}
								setMyPosts={setMyPosts}
								searchedResults={null}
								setSearchedResults={setSearchedResults}
							/>
						))
					)}
					
				</div>

			</section>
		</section>
	);
};

export default Feed;
