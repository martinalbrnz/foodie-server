import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import routes from './routes'

const app = express()
dotenv.config()

const PORT = process.env.PORT

app.use(express.json())
app.use(routes)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
