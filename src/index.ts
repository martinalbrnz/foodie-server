import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import { authMiddleware } from './middleware/auth'
import routes from './routes'
import './services/db'

const app = express()
dotenv.config()

const { PORT } = process.env

app.use(express.json())
app.use(routes)

app.get('/', authMiddleware, (req: Request, res: Response) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
