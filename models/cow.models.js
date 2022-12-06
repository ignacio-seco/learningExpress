import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import cruzamentoSchema from './cruzamento.models.js';
import curralPermanenciaSchema from './curralPermanencia.models.js';
import historicoSchema from './historico.models.js';
import litragemSchema from './litragem.models.js';
import pesagemSchema from './pesagem.models.js';

const cowSchema = new Schema(
  {
    uuid: { type: String, default: uuidv4() },
    brinco: { type: String, default: '-' },
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
    dadosCruzamentos: [cruzamentoSchema],
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
    dadosVacinas: [
      //a ser implementado
    ],
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
    estadaCurral: [curralPermanenciaSchema],
    historico: [historicoSchema],
    imagem_url: {
      type: String,
      default: 'https://pngimg.com/uploads/cow/cow_PNG50576.png',
    },
    noCurral: { type: Boolean, default: false },
    nome: { type: String, required: true },
    pasto: { type: String, default: '' },
    pesagem: [pesagemSchema],
    producaoLeite: [litragemSchema],
    sexo: { type: String, enum: ['MACHO', 'FEMEA'], required: true },
  },
  { timestamps: true }
);
export default cowSchema;
