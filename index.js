import express from 'express'
import * as dotenv from 'dotenv'
import processRouter from './routes/process.routes.js'
import { connect } from './config/db.config.js'

dotenv.config()
connect()
const app = express()
app.use(express.json())
app.use('/processos', processRouter)



app.listen(Number(process.env.PORT), ()=>console.log(`Server started at port ${process.env.PORT}`))

