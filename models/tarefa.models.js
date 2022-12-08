import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';

const tarefaSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'Propriedade' },
    uuid: { type: String, default: uuidv4() },
    dtCriacao: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    urgente: { type: Boolean, required: true, default: false },
    descricao: { type: String, required: true },
    concluida: { type: Boolean, required: true, default: false },
    dadosServidor: {
      colecao: { type: String, default: 'tarefa' },
      relacao: { type: String, default: 'propriedade' },
      referencia: { type: String, default: 'tarefas' },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
    },
  },
  { timestamps: true }
);

const TarefaModel = model('Tarefa', tarefaSchema);
export default TarefaModel;
