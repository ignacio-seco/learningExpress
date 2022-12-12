import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const propriedadeSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    creator: { type: Schema.Types.ObjectId, ref: 'User' },
    _id: { type: String, default: uuidv4() },
    rebanho: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Cow',
      },
    ],
    pastos: [String],
    gastos: [{ type: Schema.Types.ObjectId, ref: 'Gasto' }],
    ganhos: [{ type: Schema.Types.ObjectId, ref: 'Ganho' }],
    tarefas: [{ type: Schema.Types.ObjectId, ref: 'Tarefa' }],
    dadosServidor: {
      colecao: { type: String, default: 'propriedade' },
      relacao: { type: String },
      referencia: { type: String },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
      deletado: { type: Boolean, default: false, required: true },
    },
  },
  { timestamps: true }
);
const PropriedadeModel = model('Propriedade', propriedadeSchema);
export default PropriedadeModel;
