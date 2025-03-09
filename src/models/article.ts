import mongoose, {Schema, Document } from "mongoose";

export interface IArticle extends Document {
  title: string,
  content: string,
  author: string,
  createdAt: Date
}

// Define the Schema with Validations
const articleSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true, minlength: 10 },
    author: { type: String, required: true, minlength: 3 },
  },
  { timestamps: true }
);

const Article = mongoose.model<IArticle>('Article', articleSchema)
export default Article