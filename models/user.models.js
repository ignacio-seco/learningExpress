import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    propriedades: [{ type: Schema.Types.ObjectId, ref: 'Propriedade' }],
    dadosServidor: {
      colecao: { type: String, default: 'user' },
      relacao: { type: String },
      referencia: { type: String },
      lastUpdate: { type: Number, default: new Date(Date.now()).getTime() },
    },
  },
  { timestamps: true }
);

const UserModel = model('User', userSchema);
export default UserModel;
