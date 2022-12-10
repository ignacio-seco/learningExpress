import PropriedadeModel from '../models/propriedadeSchema.models.js';

async function attachCurrentUser(request, response, next) {
  try {
    const userData = request.auth; // dados que estão no token
    const user = await PropriedadeModel.findById(userData._id, {
      passwordHash: 0,
    });
    if (!user) {
      return response.status(400).json({ erro: 'usuário não localizado' });
    }
    request.currentUser = user;
    next();
  } catch (err) {
    console.log(err);
    return response.status(400).json({ erro: err });
  }
}
export default attachCurrentUser;
