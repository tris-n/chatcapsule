"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Post, ProfileCardProps } from "@types";



const ProfileCard = ({ post, myPosts, setMyPosts }: ProfileCardProps) => {
	const { data: session } = useSession();
	const router = useRouter();


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

	const handleCopy = () => {
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
				
				const filteredPosts = myPosts.filter((item: Post) => item._id !== post._id);
				setMyPosts(filteredPosts);

			} catch (error) {
				console.log(error);
			}
		}
	};

	

	return (
		<div className='profile_card'>
			<div className='flex justify-between items-center gap-5'>

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

				{session?.user.id === post.creator._id && (
					<div className='flex-center gap-4'>
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

				<div className='copy_btn' onClick={handleCopy}>
					<Image
						src={"/assets/icons/share.png"}
						alt={"share_icon"}
						width={12}
						height={12}
					/>
				</div>
			</div>
			

		</div>
	);
};

export default ProfileCard;
