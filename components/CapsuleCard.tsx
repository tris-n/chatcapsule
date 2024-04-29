"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Post, CapsuleCardProps } from "@types";



const CapsuleCard = ({ post, handleTagClick, myPosts, setMyPosts, searchedResults, setSearchedResults }: CapsuleCardProps) => {

	const { data: session } = useSession();
	const router = useRouter();

	const [opened, setOpened] = useState("");

	const dateString = post.updatedAt;
	const date = new Date(dateString);

	// Use Intl.DateTimeFormat to format the date based on the user's locale and timezone
	const formattedDate = new Intl.DateTimeFormat(navigator.language, {
		day: 'numeric', // Numeric day of the month
		month: 'short', // Abbreviated month name
		year: 'numeric', // Numeric full year
	}).format(date);



	// Click handlers

	const handleProfileClick = () => {
		window.open(post.url, '_blank');
	};

	const handleEdit = (post: Post) => {
		router.push(`/update-capsule?id=${post._id}`);
	};

	const handleDelete = async (post: Post) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this capsule?"
		);

		if (hasConfirmed) {
			try {

				await fetch(`/api/capsule/${post._id.toString()}`, {
					method: "DELETE",
				});
				
				if (searchedResults) {
					const filteredSearchedResults = searchedResults.filter((item: Post) => item._id !== post._id);
					setSearchedResults(filteredSearchedResults);
				}
				
				const filteredPosts = myPosts.filter((item: Post) => item._id !== post._id);
				setMyPosts(filteredPosts);

			} catch (error) {
				console.log(error);
			}
		}
	};

	

	return (
		<div className='capsule_card'>
			<div className='flex justify-between items-start gap-5'>
				<div
				className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
				onClick={handleProfileClick}
				>
					<Image
						src={post.creator.image}
						alt='user_image'
						width={40}
						height={40}
						className='rounded-full object-contain'
					/>

					<div className='flex flex-col'>
						<h3 className='font-satoshi font-semibold text-gray-900'>
							{post.title}
						</h3>
						<p className='font-inter text-sm text-gray-500'>
							{formattedDate}
						</p>
					</div>
				</div>

				<div className='copy_btn'>
					<Image
						src={"/assets/icons/share.png"}
						alt={opened === post.url ? "tick_icon" : "copy_icon"}
						width={12}
						height={12}
					/>
				</div>
			</div>

			<p className='my-4 font-satoshi text-sm text-gray-700'>
				{post.summary}
			</p>
			
			{post.tag.split(',').sort((a: string, b: string) => a.localeCompare(b)).map((tag: string, index: number) => {
				return <p className='font-inter text-sm blue_gradient cursor-pointer' key={index} onClick={() => handleTagClick && handleTagClick(tag.trim())}>{tag}</p>
			})}

			{session?.user.id === post.creator._id && (
				<div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
					<button
						type='submit'
						className='edit_outline_btn'
						onClick={() => handleEdit(post)}
					>
						Edit
					</button>
					<button
						type='submit'
						className='delete_outline_btn'
						onClick={() => handleDelete(post)}
					>
						Delete
					</button>
				</div>
			)}

		</div>
	);
};

export default CapsuleCard;
