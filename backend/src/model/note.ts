import mongoose, { Schema, Document } from "mongoose";

export interface INote {
  _id?: Schema.Types.ObjectId;
  title: string;
  content: string;
  author: Schema.Types.ObjectId
}

const NoteSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true
  }
});

export default mongoose.model<INote>("Note", NoteSchema);
