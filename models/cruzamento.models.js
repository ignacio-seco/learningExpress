import { model, Schema } from 'mongoose';
import { calculateBirthDate } from '../helpers/helpers.js';

const cruzamentoSchema = new Schema(
  { semen: { type: String, default: 'não informado' },
    dtCruzamento: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
    },
    confirmaçãoPrenhez: {
      type: Boolean,
      default: false,
    },
    dtProvavelNascimento: {
      type: String,
      match: /(^$|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/,
      default: '',
    },
  },
  { timestamps: true }
);
export default cruzamentoSchema;
