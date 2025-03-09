import mongoose, {Schema, Document } from "mongoose";
import { IUser } from './user';

export interface IArticle extends Document {
  title: string,
  content: string,
  author: IUser['_id'],
  createdAt: Date
}

// Define the Schema with Validations
const articleSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true, minlength: 10 },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  },
  { timestamps: true }
);

const Article = mongoose.model<IArticle>('Article', articleSchema)
export default Article