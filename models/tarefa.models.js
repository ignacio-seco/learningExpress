import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';

const tarefaSchema = new Schema(
  {
    propriedade: { type: Schema.Types.ObjectId, ref: 'Propriedade' },
    dtCriacao: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    urgente: { type: Boolean, required: true, default: false },
    descricao: { type: String, required: true },
    concluida: { type: Boolean, required: true, default: false },
    colecao:{type:String,
      default:'tarefa'},
      lastUpdate:{type:Number,
      default:(new Date(Date.now())).getTime()}
  },
  { timestamps: true }
);

const TarefaModel = model('Tarefa', tarefaSchema);
export default TarefaModel;
