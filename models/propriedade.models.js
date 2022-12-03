import { model } from "mongoose";
import propriedadeSchema from "./propriedadeSchema.models.js";

const PropriedadeModel = model("Propriedade", propriedadeSchema)
export default PropriedadeModel