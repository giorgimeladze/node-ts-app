import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db'
import articleRoutes from './routes/article'

dotenv.config()
const app = express()

//Middleware
app.use(express.json())

//Routes
app.use('/api/v1/articles', articleRoutes)

//Conect to DB
connectDB()

export default app