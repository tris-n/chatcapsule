import { connectToDB } from "@utils/database";
import Capsule from "@models/capsule";

export const GET = async (request: Request) => {

    try {
        await connectToDB()

        const capsules = await Capsule.find({}).populate('creator')

        return new Response(JSON.stringify(capsules), { status: 200 })
    } catch (error) {
		console.error("Error fetching all capsules: ", error);
        return new Response("Failed to fetch all capsules", { status: 500 })
    }
} 