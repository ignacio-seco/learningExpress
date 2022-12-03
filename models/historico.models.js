import { model, Schema } from 'mongoose';
import { calculateBirthDate, formatDateToDefault } from '../helpers/helpers.js';

const historicoSchema = new Schema(
  {
    dtHistorico: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    descricao: { type: String, required: true },
  },
  { timestamps: true }
);


export default historicoSchema;
