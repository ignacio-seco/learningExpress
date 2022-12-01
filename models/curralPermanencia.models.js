import { model, Schema } from "mongoose";
import { formatDateToDefault } from "../helpers/helpers.js";

const curralPermanenciaSchema = new Schema({
    animal:{type:Schema.Types.ObjectId,
        ref:"Cow"},
  dtEntradaCurral: {
    type: String,
    match: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
    required: true,
    default: formatDateToDefault(new Date(Date.now())),
  },
  dtSaidaCurral: {
    type: String,
    match: /(^$|([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])))/,
    default: "",
  },
},{timestamps:true});

const CurralPermanenciaModel = model("CurralPermanencia", curralPermanenciaSchema);
export default CurralPermanenciaModel