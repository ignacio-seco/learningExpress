import express from 'express';
import * as dotenv from 'dotenv';
import rebanhoRouter from './routes/rebanho.routes.js';
import cruzamentoRouter from './routes/cruzamento.routes.js';
import curralPermanenciaRouter from './routes/curralPermanencia.routes.js';
import historicoRouter from './routes/historico.routes.js';
import litragemRouter from './routes/litragem.routes.js';
import pesagemRouter from './routes/pesagem.routes.js';
import { connect } from './config/db.config.js';

dotenv.config();
connect();
const app = express();
app.use(express.json());
app.use('/rebanho', rebanhoRouter);
app.use('/cruzamento', cruzamentoRouter);
app.use('/curralpermanencia', curralPermanenciaRouter);
app.use('/historico', historicoRouter);
app.use('/litragem', litragemRouter);
app.use('/pesagem', pesagemRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
