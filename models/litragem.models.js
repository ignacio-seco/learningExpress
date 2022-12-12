import { model, Schema } from "mongoose";
import { formatDateToDefault } from "../helpers/helpers.js";
import { v4 as uuidv4 } from "uuid";

const litragemSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: "Propriedade" },
    _id: { type: String, default: uuidv4() },
    animal: { type: Schema.Types.ObjectId, ref: "Cow" },
    qtdLitros: { type: Number, required: true },
    dtVerificacao: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    dadosServidor: {
      colecao: { type: String, default: "litragem" },
      relacao: { type: String, default: "cow" },
      referencia: { type: String, default: "producaoLeite" },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
      deletado: { type: Boolean, default: false, required: true },
    },
  },
  { timestamps: true }
);

const LitragemModel = model("Litragem", litragemSchema);
export default LitragemModel;
