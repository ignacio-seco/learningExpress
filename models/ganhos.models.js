//todo
import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';

const ganhoSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'Propriedade' },
    uuid: { type: String, default: uuidv4() },
    dtGanho: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    valor: { type: Number, required: true, default: 0 },
    descricao: { type: String, required: true },
    dadosServidor: {
      colecao: { type: String, default: 'ganhos' },
      relacao: { type: String, default: 'propriedade' },
      referencia: { type: String, default: 'ganhos' },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
    },
  },
  { timestamps: true }
);

const GanhoModel = model('Ganho', ganhoSchema);
export default GanhoModel;
