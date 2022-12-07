import { model, Schema } from "mongoose";


const userSchema = new Schema({
    name:{type:String,
    required:true},
    email: { type: String, trim: true, required: true, unique: true, match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm },
    passwordHash: {type: String, required: true},    
role: {type: String, enum: ['USER', 'ADMIN'], default: "USER"},
propriedades:[{type:Schema.Types.ObjectId,
ref:"Propriedade"}]
},{timestamps:true})

const UserModel = model("User", userSchema)
export default UserModel