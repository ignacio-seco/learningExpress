import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  const { _id, email, nome, role } = user;
    const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = 10 * 24 * 60 * 60 * 1000; //10 dias
  return jwt.sign({ _id, email, nome, role }, signature, {
    expiresIn: expiration,
  });
};
export default generateToken
