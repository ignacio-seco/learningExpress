import express from 'express';
import * as dotenv from 'dotenv';
import cowRouter from './routes/cow.routes.js';
import cruzamentoRouter from './routes/cruzamento.routes.js';
import curralPermanenciaRouter from './routes/curralPermanencia.routes.js';
import historicoRouter from './routes/historico.routes.js';
import litragemRouter from './routes/litragem.routes.js';
import pesagemRouter from './routes/pesagem.routes.js';
import userRouter from './routes/user.routes.js';
import ganhosRouter from './routes/ganhos.routes.js';
import gastosRouter from './routes/gastos.routes.js';
import tarefasRouter from './routes/tarefas.routes.js';
import sincronizarRouter from './routes/sync.routes.js';
import cors from 'cors';
import { connect } from './config/db.config.js';
import uploadRoute from './routes/uploadImages.routes.js';

dotenv.config();

const app = express();
// Configuração do CORS
const allowedOrigins = ['https://rebanho.netlify.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,  // Se você precisar suportar cookies ou autenticação de sessão
};


app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/animais', cowRouter);
app.use('/cruzamento', cruzamentoRouter);
app.use('/curralpermanencia', curralPermanenciaRouter);
app.use('/historico', historicoRouter);
app.use('/litragem', litragemRouter);
app.use('/pesagem', pesagemRouter);
app.use('/user', userRouter);
app.use('/ganhos', ganhosRouter);
app.use('/gastos', gastosRouter);
app.use('/tarefas', tarefasRouter);
app.use('/sincronizar', sincronizarRouter);
app.use('/upImg', uploadRoute)

connect().then(() => {
  app.listen(Number(process.env.PORT), () =>
    console.log(`Server started at port ${process.env.PORT}`)
  );
});
