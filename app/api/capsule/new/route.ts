import Capsule from "@models/capsule";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {

    const { userId, url, title, summary, tag } = await request.json();

    try {
        await connectToDB();
        const newCapsule = new Capsule({ creator: userId, url, title, summary, tag });

        await newCapsule.save();
        return new Response(JSON.stringify(newCapsule), { status: 201 })
    } catch (error) {
		console.error("Error creating new capsule: ", error);
        return new Response("Failed to create a new capsule", { status: 500 });
    }
}
