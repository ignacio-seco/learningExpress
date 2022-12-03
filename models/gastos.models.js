//todo
import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';

const gastoSchema = new Schema(
  {
    dtGasto: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    valor: { type: Number, required: true, default: 0 },
    descricao: { type: String, required: true },
  },
  { timestamps: true }
);


export default gastoSchema;
