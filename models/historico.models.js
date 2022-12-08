import { model, Schema } from 'mongoose';
import { calculateBirthDate, formatDateToDefault } from '../helpers/helpers.js';

const historicoSchema = new Schema(
  {
    animal: { type: Schema.Types.ObjectId, ref: 'Cow' },
    dtHistorico: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    descricao: { type: String, required: true },
    dadosServidor:{
      colecao:{type:String,
        default:'historico'},
        relacao:{type:String,
          default:'cow'},
        referencia:{type:String,
        default:'historico'},  
        lastUpdate:{type:Number,
        default:(new Date(Date.now())).getTime()}
    },
  },
  { timestamps: true }
);

const HistoricoModel = model('Historico', historicoSchema);
export default HistoricoModel;
