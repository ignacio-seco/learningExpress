import express from 'express';
import * as dotenv from 'dotenv';
import rebanhoRouter from './routes/rebanho.routes.js';
import cruzamentoRouter from './routes/cruzamento.routes.js';
import curralPermanenciaRouter from './routes/curralPermanencia.routes.js';
import historicoRouter from './routes/historico.routes.js';
import litragemRouter from './routes/litragem.routes.js';
import pesagemRouter from './routes/pesagem.routes.js';
import userRouter from './routes/user.routes.js';
import propriedadeRouter from './routes/propriedade.routes.js';
import ganhosRouter from './routes/ganhos.routes.js';
import gastosRouter from './routes/gastos.routes.js';
import tarefasRouter from './routes/tarefas.routes.js';

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
app.use('/user', userRouter);
app.use('/propriedade', propriedadeRouter);
app.use('/ganhos', ganhosRouter);
app.use('/gastos', gastosRouter);
app.use('/tarefas', tarefasRouter);

app.listen(Number(process.env.PORT), () =>
  console.log(`Server started at port ${process.env.PORT}`)
);
