//todo
import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';

const gastoSchema = new Schema(
  {
    propriedade: { type: Schema.Types.ObjectId, ref: 'Propriedade' },
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

const GastoModel = model('Gasto', gastoSchema);
export default GastoModel;
