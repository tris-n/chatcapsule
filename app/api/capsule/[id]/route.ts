import Capsule from "@models/capsule";
import { connectToDB } from "@utils/database";

interface ParamsProps {
	params: {
		id: string
	}
}



export const GET = async (request: Request, { params }: ParamsProps) => {

    try {
        await connectToDB()

        const capsule = await Capsule.findById(params.id).populate("creator")
        if (!capsule) return new Response("Capsule Not Found", { status: 404 });

        return new Response(JSON.stringify(capsule), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}



export const PATCH = async (request: Request, { params }: ParamsProps) => {

    const { url, title, summary, tag } = await request.json();

    try {
        await connectToDB();

        // Find the existing capsule by ID
        const existingCapsule = await Capsule.findById(params.id);

        if (!existingCapsule) {
            return new Response("Capsule not found", { status: 404 });
        }

        // Update the capsule with new data
        existingCapsule.url = url;
        existingCapsule.title = title;
        existingCapsule.summary = summary;
        existingCapsule.tag = tag;

        await existingCapsule.save();

        return new Response("Successfully updated the Capsule", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Capsule", { status: 500 });
    }
};

export const DELETE = async (request: Request, { params }: ParamsProps) => {

    try {
        await connectToDB();

        // Find the capsule by ID and remove it
        const deleteResults = await Capsule.findByIdAndDelete(params.id);

        return new Response("Capsule deleted successfully", { status: 200 });
    } catch (error) {
        return new Response("Error deleting Capsule", { status: 500 });
    }
};
