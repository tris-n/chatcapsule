'use client';

import { SessionProvider } from "next-auth/react";

interface ProviderProps {
	children: React.ReactNode,
}



const Provider = ({ children }: ProviderProps) => (
	<SessionProvider>
		{children}
	</SessionProvider>
)

export default Provider;
