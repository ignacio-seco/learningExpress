import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const cowSchema = new Schema(
  {
    uuid: { type: String, default: uuidv4() },
    propriedade: { type: Schema.Types.ObjectId, ref: 'Propriedade' },
    brinco: { type: String },
    brincoDaMae: { type: String },
    dadosCompra: {
      comprado: { type: Boolean, default: false },
      dtCompra: {
        type: String,
        match: /(^$|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/,
        default: '',
      },
      valorCompra: { type: Number },
      vendedor: { type: String },
    },
    dadosCruzamentos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Cruzamento',
      },
    ],
    dadosMorte: {
      morreu: { type: Boolean, default: false },
      dtMorte: {
        type: String,
        match: /(^$|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/,
        default: '',
      },
      causaMorte: { type: String, default: '' },
    },
    dtNascimento: {
      type: String,
      match: /(^$|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/,
      required: true,
    },
    dadosVenda: {
      vendida: {
        type: Boolean,
        default: false,
      },
      valorVenda: { type: Number },
      comprador: { type: String },
      dtVenda: {
        type: String,
        match: /(^$|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/,
        default: '',
      },
    },
    estadaCurral: [
      {
        type: Schema.Types.ObjectId,
        ref: 'CurralPermanencia',
      },
    ],
    historico: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Historico',
      },
    ],
    imagem_url: {
      type: String,
      default: 'https://pngimg.com/uploads/cow/cow_PNG50576.png',
    },
    noCurral: { type: Boolean, default: false },
    nome: { type: String, required: true },
    pasto: { type: String, default: '' },
    pesagem: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Pesagem',
      },
    ],
    producaoLeite: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Litragem',
      },
    ],
    sexo: { type: String, enum: ['MACHO', 'FEMEA'], required: true },
  },
  { timestamps: true }
);
const CowModel = model('Cow', cowSchema);
export default CowModel;
