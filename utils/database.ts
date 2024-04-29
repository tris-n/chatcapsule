import mongoose from 'mongoose';

export const connectToDB = async (): Promise<void> => {
	
	mongoose.set('strictQuery', true);

	if (!process.env.MONGODB_URI) {
		throw new Error("MONGODB_URI is not defined.");
    }

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "chat_capsule",
		});
		console.log('MongoDB connected');
	} catch (error) {
		console.error('Failed to connect to MongoDB:', error);
		throw new Error(`Database connection error: ${error}`);
	}
}
