import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';

const curralPermanenciaSchema = new Schema(
  {
 dtEntradaCurral: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    dtSaidaCurral: {
      type: String,
      match: /(^$|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/,
      default: '',
    },
  },
  { timestamps: true }
);


export default curralPermanenciaSchema;
