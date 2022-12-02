import { Schema } from 'mongoose';

const propriedadeSchema = new Schema(
  {
    nome: { type: String },
    rebanho: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Cow',
      },
    ],
    pastos: [String],
    controleFinanceiro: {
      gastos: [{ type: Schema.Types.ObjectId, ref: 'Gasto' }],
      ganhos: [{ type: Schema.Types.ObjectId, ref: 'Ganho' }],
    },
    tarefas: [{ type: Schema.Types.ObjectId, ref: 'Tarefa' }],
  },
  { timestamps: true }
);
