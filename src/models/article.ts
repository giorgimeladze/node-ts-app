import mongoose, {Schema, Document } from "mongoose";

export interface IArticle extends Document {
  title: string,
  content: string,
  author: string,
  createdAt: Date
}

const articleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }
  },
  { timestamps: true }
)

const Article = mongoose.model<IArticle>('Article', articleSchema)
export default Article