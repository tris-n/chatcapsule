import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';
import User from '@models/user';

// Validate essential environment variables
if (!process.env.GOOGLE_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.NEXTAUTH_SECRET) {
    throw new Error("Required environment variable(s) for NextAuth are missing.");
}



const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		})
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async session({ session }) {
			await connectToDB();

			// store the user id from MongoDB to session
			const sessionUser = await User.findOne({ email: session.user.email });
			session.user.id = sessionUser._id.toString();

			return session;
		},
		async signIn({ profile }) {
			try {
				await connectToDB();

				if (profile) {
					// check if user already exists
					const userExists = await User.findOne({ email: profile.email });
	
					// if not, create a new document and save user in MongoDB
					if (!userExists) {
						await User.create({
							email: profile.email,
							image: profile.picture,
							username: profile.name,
						});
					}

					return true
				} else {
					console.error("Sign-in attempt without a profile.")
					return false
				}

			} catch (error) {
				console.log("Error checking if user exists: ", error);
				return false
			}
		},
	}
})

export { handler as GET, handler as POST }
