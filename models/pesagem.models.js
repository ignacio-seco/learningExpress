import { model, Schema } from 'mongoose';
import { calculateBirthDate, formatDateToDefault } from '../helpers/helpers.js';

const pesagemSchema = new Schema(
  {
    peso: { type: Number, required: true },
    dtPesagem: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
  },
  { timestamps: true }
);

export default pesagemSchema;
