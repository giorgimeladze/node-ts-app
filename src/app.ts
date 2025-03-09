import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'

dotenv.config()
const app = express()

app.use(express.json())

connectDB()

export default app