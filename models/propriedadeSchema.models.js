import { Schema } from 'mongoose';
import cowSchema from './cow.models.js';
import ganhoSchema from './ganhos.models.js';
import gastoSchema from './gastos.models.js';
import tarefaSchema from './tarefa.models.js';

const propriedadeSchema = new Schema(
  {
    nome: { type: String, required: true },
    rebanho: [cowSchema],
    pastos: [String],
    controleFinanceiro: {
      gastos: [gastoSchema],
      ganhos: [ganhoSchema],
    },
    tarefas: [tarefaSchema],
    revTime: { type: Date, default: new Date(Date.now()) },
    dataRevision: { type: Number, default: 0 }, // campo para ser atualizado no frontend para identificar quais dados estão mais atualizados, se o do DB ou do cliente
    oldId: { type: String },
    backupVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);
export default propriedadeSchema;
