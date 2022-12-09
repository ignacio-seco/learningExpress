import express from 'express';
import * as dotenv from 'dotenv';
import userRouter from './routes/user.routes.js'
import { connect } from './config/db.config.js';

dotenv.config();
connect();
const app = express();
app.use(express.json());
app.use('/user', userRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
