import { model, Schema } from 'mongoose';
import { calculateBirthDate } from '../helpers/helpers.js';

const cruzamentoSchema = new Schema(
  {
    animal: { type: Schema.Types.ObjectId, ref: 'Cow' },
    semen: { type: String, default: 'não informado' },
    dtCruzamento: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
    },
    confirmacaoPrenhez: {
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
const CruzamentoModel = model('Cruzamento', cruzamentoSchema);
export default CruzamentoModel;
