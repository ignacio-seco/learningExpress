import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const { _id, email, name, role, propriedades } = user;//coloquei as propriedades no token porque parece que os dados delas serão necessários para autenticar as buscas por animais
  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = 10 * 24 * 60 * 60 * 1000; //10 dias
  return jwt.sign({ _id, email, name, role, propriedades }, signature, {
    expiresIn: expiration,
  });
};
export default generateToken
