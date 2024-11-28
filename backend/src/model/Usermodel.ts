import mongoose, { Schema, Document } from "mongoose";

 export interface IUser  {
  _id?: Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  
});

export default mongoose.model<IUser>("User", userSchema);
