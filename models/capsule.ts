import { Schema, model, models, Document } from 'mongoose';

interface ICapsule extends Document {
	creator: Schema.Types.ObjectId;
	url: string;
	title: string;
	summary: string;
	tag: string;
}

const CapsuleSchema = new Schema<ICapsule>({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	url: {
		type: String,
		required: [true, 'URL is required.'],
	},
	title: {
		type: String,
		required: [true, 'Title is required.'],
	},
	summary: {
		type: String,
		required: [true, 'Summary is required.'],
	},
	tag: {
		type: String,
		required: [true, 'Tag is required.'],
	}
	}, {
	timestamps: true
});

const Capsule = models.Capsule || model<ICapsule>('Capsule', CapsuleSchema);

export default Capsule;
