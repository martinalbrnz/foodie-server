import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import routes from './routes'
import './services/db'

const app = express()
dotenv.config()

const { PORT } = process.env

app.use(express.json())
app.use(cors())
app.use(routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
