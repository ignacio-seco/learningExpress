import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';
import { v4 as uuidv4 } from 'uuid';

const curralPermanenciaSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'Propriedade' },
    uuid: { type: String, default: uuidv4() },
    animal: { type: Schema.Types.ObjectId, ref: 'Cow' },
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
    dadosServidor: {
      colecao: { type: String, default: 'curral' },
      relacao: { type: String, default: 'cow' },
      referencia: { type: String, default: 'estadaCurral' },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
    },
  },
  { timestamps: true }
);


export default curralPermanenciaSchema;
