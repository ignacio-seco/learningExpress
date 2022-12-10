import { Schema, model } from "mongoose";
import cowSchema from "./cow.models.js";
import ganhoSchema from "./ganhos.models.js";
import gastoSchema from "./gastos.models.js";
import tarefaSchema from "./tarefa.models.js";
import { v4 as uuidv4 } from "uuid";

const propriedadeBackupSchema = new Schema(
  {
    nome: { type: String },
    email: {
      type: String,
    },
    passwordHash: { type: String },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    creator: { type: Schema.Types.ObjectId, ref: "User" },
    uuid: { type: String, default: uuidv4() },
    rebanho: [cowSchema],
    pastos: [String],
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

const PropertyBackupModel = model("Backup", propriedadeBackupSchema);
export default PropertyBackupModel;
