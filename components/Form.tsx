import Link from "next/link";

import { FormProps } from "@types";



const Form = ({ type, post, setPost, submitting, handleSubmit }: FormProps) => {
	return (
		<section className='w-full max-w-full flex-start flex-col'>
			<h1 className='head_text text-left'>
				<span className='green_gradient2'>{type} Capsule</span>
			</h1>
			<p className='desc text-left max-w-md'>
				{type} your own AI conversation capsules, tailor-made for your eyes only. 
			</p>

			<form
				onSubmit={handleSubmit}
				className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
			>

				<label>
				<span className='font-satoshi font-semibold text-base text-gray-700'>
					URL
				</span>
				<input
					value={post.url}
					onChange={(event) => setPost({ ...post, url: event.target.value })}
					type='text'
					placeholder='Paste your conversation URL here'
					required
					className='form_input'
				/>
				</label>

				<label>
				<span className='font-satoshi font-semibold text-base text-gray-700'>
					Title
				</span>
				<input
					value={post.title}
					onChange={(e) => setPost({ ...post, title: e.target.value })}
					type='text'
					placeholder='Paste your conversation title here'
					required
					className='form_input'
				/>
				</label>

				<label>
				<span className='font-satoshi font-semibold text-base text-gray-700'>
					Summary (100 words)
				</span>

				<textarea
					value={post.summary}
					onChange={(e) => setPost({ ...post, summary: e.target.value })}
					placeholder='Write your summary here'
					required
					className='form_textarea'
				/>
				</label>
			
				<label>
				<span className='font-satoshi font-semibold text-base text-gray-700'>
					Tags{" "}
					<span className='font-normal'>
						{/* (webdev, code, idea, etc.) */}
					</span>
				</span>
				<input
					value={post.tag}
					onChange={(e) => setPost({ ...post, tag: e.target.value })}
					type='text'
					placeholder='Write your tags here, separated by commas. Example: webdev, code, idea'
					required
					className='form_input'
				/>
				</label>

				<div className='flex-end mx-3 mb-5 gap-4'>
				<Link href='/' className='outline_btn'>
					Cancel
				</Link>

				<button
					type='submit'
					disabled={submitting}
					className='edit_outline_btn2'
				>
					{submitting ? 
						type === 'Create' ? `Creating...` : `Editing...`
					: 
						type
					}
				</button>
				</div>
			</form>
		</section>
	);
};

export default Form;
