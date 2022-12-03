import { Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';

const tarefaSchema = new Schema(
  {
    dtCriacao: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    urgente: { type: Boolean, required: true, default: false },
    descricao: { type: String, required: true },
    concluida: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

export default tarefaSchema;
