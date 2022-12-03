import express from 'express';
import * as dotenv from 'dotenv';
import propriedadeRouter from './routes/propriedade.routes.js';
import { connect } from './config/db.config.js';

dotenv.config();
connect();
const app = express();
app.use(express.json());
app.use('/propriedade', propriedadeRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
