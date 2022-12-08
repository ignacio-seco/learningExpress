import { model, Schema } from 'mongoose';

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
    uuid: { type: String, default: uuidv4() },
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
    oldId: { type: String },
    backupVersion: { type: Number, default: 0 },
    dadosServidor: {
      colecao: { type: String, default: 'propriedade' },
      relacao: { type: String },
      referencia: { type: String },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
    },
  },
  { timestamps: true }
);
const PropriedadeModel = model('Propriedade', propriedadeSchema);
export default PropriedadeModel;
