export interface Post {
	_id: string,
	url: string,
	title: string,
	summary: string,
	tag: string,
	creator: {
		image: string,
		_id: string,
	},
	updatedAt: Date,
}

export interface CreatePost {
	url: string,
	title: string,
	summary: string,
	tag: string,
}

export interface FormProps {
	type: string
	post: CreatePost, 
	setPost: (post: CreatePost) => void;
	submitting: boolean, 
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface CapsuleCardProps {
	post: Post, 
	handleTagClick: (tagName: string) => void, 
	myPosts: Post[], 
	setMyPosts: (post: Post[]) => void, 
	searchedResults: Post[] | null, 
	setSearchedResults: (post: Post[]) => void,
}

export interface ProfileCardProps { 
	post: Post, 
	myPosts: Post[], 
	setMyPosts: (post: Post[]) => void, 
}