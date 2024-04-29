import { connectToDB } from "@utils/database";
import Capsule from "@models/capsule";

interface ParamsProps {
	params: {
		id: string
	}
}



export const GET = async (request: Request, { params }: ParamsProps ) => {

    try {
        await connectToDB()

        const capsules = await Capsule.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(capsules), { 
			status: 200,
			headers: {
				"Content-Type": "application/json"
			}
		});

    } catch (error) {
		console.error("Error fetching capsules: ", error);
        return new Response("Failed to fetch capsules created by user", { status: 500 })
    }
} 