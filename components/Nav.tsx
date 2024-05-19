"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import SpinnerButton from "@components/SpinnerButton";

type ProviderMap = Record<BuiltInProviderType | string, ClientSafeProvider> | null;



const Nav = () => {

	const { data: session, status } = useSession();

	const [providers, setProviders] = useState<ProviderMap>(null);

	const [toggleDropdown, setToggleDropdown] = useState(false);
	const [isLoading, setIsLoading] = useState(true);


	useEffect(() => {
		(async () => {

			try {
				const response = await getProviders();
				setProviders(response);
			} catch (error) {
				console.error("Failed to fetch providers.", error)
				setProviders({})
			}
			
		})();
	}, []);


	useEffect(() => {

		if (providers !== null && status !== "loading") {
			setIsLoading(false)
		} else {
			setIsLoading(true)
		}

	}, [status, providers]);



	return (
		<nav className='flex-between w-full mb-16 pt-3 navIndex'>
			<Link href='/' className='flex gap-2 flex-center'>
				<Image
					src='/assets/images/chat-logo.svg'
					alt='logo'
					width={30}
					height={30}
					className='object-contain'
				/>
				<p className='logo_text'>ChatCapsule</p>
			</Link>

			{isLoading ? <SpinnerButton type="Load" /> : (

				<>
				{/* Desktop Navigation */}
				<div className='sm:flex hidden'>
					{session?.user ? (
						<div className='flex gap-3 md:gap-5'>
							<Link href='/create-capsule' className='black_btn'>
								Create Capsule
							</Link>

							<button type='button' onClick={() => signOut()} className='outline_btn'>
								Sign Out
							</button>

							<Link href='/profile'>
								<Image
									src={session?.user.image}
									width={37}
									height={37}
									className='rounded-full'
									alt='profile'
								/>
							</Link>
						</div>
					) : (
						<>
							{providers &&
								Object.values(providers).map((provider) => (
									<button
										type='button'
										key={provider.name}
										onClick={() => {
											signIn(provider.id);
										}}
										className='black_btn'
									>
										Sign in
									</button>
							))}
						</>
					)}
				</div>

				{/* Mobile Navigation */}
				<div className='sm:hidden flex relative'>
					{session?.user ? (
						<div className='flex'>
							<Image
								src={session?.user.image}
								width={37}
								height={37}
								className='rounded-full'
								alt='profile'
								onClick={() => setToggleDropdown(!toggleDropdown)}
							/>

							{toggleDropdown && (
								<div className='dropdown'>
									<Link
										href='/profile'
										className='dropdown_link'
										onClick={() => setToggleDropdown(false)}
									>
										My Profile
									</Link>
									<Link
										href='/create-capsule'
										className='dropdown_link'
										onClick={() => setToggleDropdown(false)}
									>
										Create Capsule
									</Link>
									<button
										type='button'
										onClick={() => {
											setToggleDropdown(false);
											signOut();
										}}
										className='mt-5 w-full black_btn'
									>
										Sign Out
									</button>
								</div>
							)}
						</div>
					) : (
						<>
							{providers &&
							Object.values(providers).map((provider) => (
								<button
									type='button'
									key={provider.name}
									onClick={() => {
										signIn(provider.id);
									}}
									className='black_btn'
								>
									Sign in
								</button>
							))}
						</>
					)}
				</div>
				</>
			)}

		</nav>
	);
};

export default Nav;
