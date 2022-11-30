import { model, Schema } from 'mongoose';
import { formatDateToDefault } from '../helpers/helpers';

const curralPemanenciaSchema = new Schema({
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
});

const historicoSchema = new Schema({
  dtHistorico: {
    type: String,
    match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
    required: true,
    default: formatDateToDefault(new Date(Date.now())),
  },
  descricao: { type: String, required: true },
});

const pesagemSchema = new Schema({
  peso: { type: Number, required: true },
  dtPesagem: {
    type: String,
    match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
    required: true,
    default: formatDateToDefault(new Date(Date.now())),
  },
});

const litragemSchema = new Schema({
  qtdLitros: { type: Number, required: true },
  dtVerificacao: {
    type: String,
    match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
    required: true,
    default: formatDateToDefault(new Date(Date.now())),
  },
});
const cruzamentoSchema = new Schema({
  dtCruzamento: {
    type: String,
    match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
    required: true,
  },
});

const cowSchema = new Schema({
  brinco: { type: Number },
  brincoDaMae: { type: Number },
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
  dadosCruzamentos: [cruzamentoSchema],
  dadosMorte: {
    morreu: { type: Boolean, default: false },
    dtMorte: {
      type: String,
      match: /(^$|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/,
      default: false,
    },
    causaMorte: { type: 'String' },
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
  estadaCurral: [curralPemanenciaSchema],
  historico: [historicoSchema],
  imagem_url: {
    type: 'string',
    default: 'https://pngimg.com/uploads/cow/cow_PNG50576.png',
  },
  noCurral: { type: Boolean, default: false },
  nome: { type: String, required: true },
  pasto: { type: String, default: '' },
  pesagem: [pesagemSchema],
  producaoLeite: [litragemSchema],
  sexo: { type: String, enum: ['MACHO', 'FEMEA'], required: true },
});
const CowSchema = model('Cow', cowSchema);
export default CowSchema;
