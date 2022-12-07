import { model, Schema } from 'mongoose';

const propriedadeSchema = new Schema(
  {
    usuario:{type: Schema.Types.ObjectId,
    ref:"User"},
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
    revTime: { type: Date, default: new Date(Date.now()) },
    dataRevision: { type: Number, default: 0 }, // campo para ser atualizado no frontend para identificar quais dados estão mais atualizados, se o do DB ou do cliente
    oldId: { type: String },
    backupVersion: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const PropriedadeModel = model("Propriedade", propriedadeSchema)
export default PropriedadeModel