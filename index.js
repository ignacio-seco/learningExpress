import express from 'express'
import * as dotenv from 'dotenv'
import processRouter from './routes/process.routes.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use('/processos', processRouter)



app.listen(Number(process.env.PORT), ()=>console.log(`Server started at port ${process.env.PORT}`))

