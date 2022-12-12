import { model, Schema } from 'mongoose';
import { calculateBirthDate } from '../helpers/helpers.js';
import { v4 as uuidv4 } from 'uuid';

const cruzamentoSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'Propriedade' },
    _id: { type: String, default: uuidv4() },
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
    dadosServidor: {
      colecao: { type: String, default: 'cruzamento' },
      relacao: { type: String, default: 'cow' },
      referencia: { type: String, default: 'dadosCruzamento' },
      populaveis:{type:Array,
        default:[]},
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
      deletado: { type: Boolean, default: false, required: true },
    },
  },
  { timestamps: true }
);
const CruzamentoModel = model('Cruzamento', cruzamentoSchema);
export default CruzamentoModel;
