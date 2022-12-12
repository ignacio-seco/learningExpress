import { model, Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const propriedadeSchema = new Schema(
  {
    nome: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    _id: { type: String, default: uuidv4() },
    rebanho: [{ type: Schema.Types.UUID, ref: "Cow" }],
    pastos: [String],
    gastos: [{ type: Schema.Types.UUID, ref: "Gasto" }],
    ganhos: [{ type: Schema.Types.UUID, ref: "Ganho" }],
    tarefas: [{ type: Schema.Types.UUID, ref: "Tarefa" }],
    dadosServidor: {
      colecao: { type: String, default: "propriedade" },
      relacao: { type: String },
      referencia: { type: String },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
      populaveis: {
        type: Array,
        default: ["rebanho", "gastos", "ganhos", "tarefas"],
      },
      deletado: { type: Boolean, default: false, required: true },
    },
  },
  { timestamps: true }
);
const PropriedadeModel = model("Propriedade", propriedadeSchema);
export default PropriedadeModel;
