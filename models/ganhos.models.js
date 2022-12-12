//todo
import { model, Schema } from "mongoose";
import { formatDateToDefault } from "../helpers/helpers.js";
import { v4 as uuidv4 } from "uuid";

const ganhoSchema = new Schema(
  {
    creator: { type: Schema.Types.UUID, ref: "Propriedade" },
    _id: { type: String, default: uuidv4() },
    dtGanho: {
      type: String,
      match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
      required: true,
      default: formatDateToDefault(new Date(Date.now())),
    },
    valor: { type: Number, required: true, default: 0 },
    descricao: { type: String, required: true },
    dadosServidor: {
      colecao: { type: String, default: "ganhos" },
      relacao: { type: String, default: "propriedade" },
      referencia: { type: String, default: "ganhos" },
      populaveis: { type: Array, default: [] },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
      deletado: { type: Boolean, default: false, required: true },
    },
  },
  { timestamps: true }
);

const GanhoModel = model("Ganho", ganhoSchema);
export default GanhoModel;
