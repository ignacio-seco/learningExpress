//para continuar amanhã => seguir o guia da professora Karen => https://karenokasaki.notion.site/karenokasaki/Autentica-o-852509954c1747f6a156606e433ea04d

//para continuar amanhã => seguir o guia da professora Karen => https://karenokasaki.notion.site/karenokasaki/Autentica-o-852509954c1747f6a156606e433ea04d

import express from 'express';
import bcrypt from 'bcrypt';
import PropriedadeModel from '../models/propriedade.models.js';
import PropertyBackupModel from '../models/propertyBackup.models.js';
import generateToken from '../config/jwt.config.js';
import isAuth from '../middlewares/isAuth.js';
import attachCurrentUser from '../middlewares/attachCurrentUser.js';
const router = express.Router();
const basemodel = PropriedadeModel;
const Backup = PropertyBackupModel;

const saltRounds = 10;

router.post('/signup', async (request, response) => {
  try {
    const { password } = request.body;

    if (
      !password ||
      !password.match(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@!#])[0-9a-zA-Z$*!&@#]{8,}$/
      )
    ) {
      return response.status(400).json({
        message:
          'Sua senha não possui os requisitos de segurança necessários à criação da conta',
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await basemodel.create({
      ...request.body,
      passwordHash: hashedPassword,
    });
    delete newUser._doc.passwordHash;
    return response.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await basemodel.findOne({ email: email });
    if (!user) {
      return response.status(400).json({ msg: 'Usuário não cadastrado' });
    }
    if (await bcrypt.compare(password, user.passwordHash)) {
      delete user._doc.passwordHash;
      const token = generateToken(user);
      return response.status(200).json({ user: user, token: token });
    } else {
      return response.status(401).json({ msg: 'Email ou senha inválido' });
    }
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.get('/perfil', isAuth, attachCurrentUser, async (request, response) => {
  try {
    return response.status(200).json(request.currentUser);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: 'Algo deu muuuito errado', error });
  }
});

router.put('/change', isAuth, attachCurrentUser, async (request, response) => {
  try {
    const id = request.currentUser._id;
    const originalData = await basemodel.findById(id);
    const newBackup = { ...originalData._doc, oldId: originalData._doc._id };
    const maxRev = newBackup.backupVersion - 5; //5 aqui é a quantidade máxima de backups de cada propriedade rural
    console.log(`this is the MaxRev ${maxRev}`);
    delete newBackup._id;
    await Backup.create(newBackup);
    await Backup.deleteMany({ oldId: id } && { backupVersion: maxRev });
    const newRequestBody = {
      ...request.body,
      __v: request.body.__v + 1,
      backupVersion: request.body.backupVersion + 1,
    };
    const update = await basemodel.findByIdAndUpdate(
      id,
      newRequestBody, //sim... o objeto é completamente substituído pelo que estiver na requisição do usuário
      { new: true, runValidators: true }
    );
    return response.status(200).json(update);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.delete(
  '/deleteUser',
  isAuth,
  attachCurrentUser,
  async (request, response) => {
    try {
      const id = request.currentUser._id;
      const deleteproperty = await basemodel.findByIdAndDelete(id);
      return response.status(200).json(deleteproperty);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ msg: 'Algo deu muuuito errado' });
    }
  }
);

router.put(
  '/trocarsenha',
  isAuth,
  attachCurrentUser,
  async (request, response) => {
    try {
      const { password } = request.body;

      if (
        !password ||
        !password.match(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@!#])[0-9a-zA-Z$*!&@#]{8,}$/
        )
      ) {
        return response.status(400).json({
          message:
            'Sua senha não possui os requisitos de segurança necessários à criação da conta',
        });
      }
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updatedUser = await basemodel.findByIdAndUpdate(
        request.currentUser._id,
        {
          passwordHash: hashedPassword,
        }
      );
      delete updatedUser._doc.passwordHash;
      return response.status(201).json(updatedUser);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ msg: 'Algo deu muuuito errado' });
    }
  }
);

export default router;
