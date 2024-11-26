import mongoose, { Schema, Document } from "mongoose";

interface INote extends Document {
  title: string;
  content: string;
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default mongoose.model<INote>("Note", NoteSchema);
