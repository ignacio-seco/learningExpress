import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers.js';

const litragemSchema = new Schema(
  {
    animal: { type: Schema.Types.ObjectId, ref: 'Cow' },
    qtdLitros: { type: Number, required: true },
    dtVerificacao: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    dadosServidor:{
      colecao:{type:String,
        default:'litragem'},
        relacao:{type:String,
          default:'cow'},
        referencia:{type:String,
        default:'producaoLeite'},  
        lastUpdate:{type:Number,
        default:(new Date(Date.now())).getTime()}
    },
  },
  { timestamps: true }
);

const LitragemModel = model('Litragem', litragemSchema);
export default LitragemModel;
