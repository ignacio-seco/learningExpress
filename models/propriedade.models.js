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
    oldId: { type: String },
    backupVersion: { type: Number, default: 0 },
    colecao:{type:String,
      default:'propriedade'},
      lastUpdate:{type:Number,
      default:(new Date(Date.now())).getTime()}
  },
  { timestamps: true }
);
const PropriedadeModel = model("Propriedade", propriedadeSchema)
export default PropriedadeModel