import { Schema, model } from "mongoose";
import cowSchema from "./cow.models.js";
import ganhoSchema from "./ganhos.models.js";
import gastoSchema from "./gastos.models.js";
import tarefaSchema from "./tarefa.models.js";
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
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    uuid: { type: String, default: uuidv4() },
    rebanho: [cowSchema],
    pastos: { type: Array, default: ["sem pasto cadastrado"] },
    gastos: [gastoSchema],
    ganhos: [ganhoSchema],
    tarefas: [tarefaSchema],
    oldId: { type: String },
    backupVersion: { type: Number, default: 0 },
    dadosServidor: {
      colecao: { type: String, default: "propriedade" },
      relacao: { type: String },
      referencia: { type: String },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
    },
  },
  { timestamps: true }
);
const PropriedadeModel = model("Propriedade", propriedadeSchema);
export default PropriedadeModel;
