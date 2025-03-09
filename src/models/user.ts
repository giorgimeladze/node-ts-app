import mongoose, { Schema, Document } from 'mongoose';

// Define User Interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

// Define User Schema
const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true }
);

// Create User Model
const User = mongoose.model<IUser>('User', userSchema);
export default User;
