import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
	interface Session {
		user: {
			name: string,
			email: string,
			image: string,
			id: string,
		},
		error: string | ErrorDetails,
	}

	interface ErrorDetails {
		message: string,
		code?: string,
	}

	interface Profile {
		email: string,
		picture: string,
		name: string,
	}
}