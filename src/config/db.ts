import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URI = (<string> process.env.MONGO_URI)

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.log('Mongo DB connection error: ', err)
    process.exit(1)
  }
}

export default connectDB