import dotenv from 'dotenv'
import { connect } from 'mongoose'
;(async function connectToDB() {
    dotenv.config()

    await connect(process.env.DATABASE_URL!)
        .then((_) => console.log('Connected to DB'))
        .catch((err: Error) => console.log(err.message))
})()
