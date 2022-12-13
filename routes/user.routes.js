//para continuar amanhã => seguir o guia da professora Karen => https://karenokasaki.notion.site/karenokasaki/Autentica-o-852509954c1747f6a156606e433ea04d

import express from "express";
import bcrypt from "bcrypt";
import PropriedadeModel from "../models/propriedade.models.js";
import generateToken from "../config/jwt.config.js";
import isAuth from "../middlewares/isAuth.js";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import mongoose from "mongoose";
const router = express.Router();
const saltRounds = 10;

router.post("/signup", async (request, response) => {
  try {
    const { nome, email, password } = request.body;
    
    if (!nome || !email || !password ){
      return response.status(400).json({
        errorMessage:
            "Você precisa preencher todos os campos",
      });
    }

    if (
      !password ||
      !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*!&@#]{8,}$/)
    ) {
      return response.status(400).json({
        errorMessage:
          "Sua senha não possui os requisitos de segurança necessários à criação da conta",
      });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await PropriedadeModel.create({
      ...request.body,
      passwordHash: hashedPassword,
    });
    delete newUser._doc.passwordHash;
    return response.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    if (err instanceof mongoose.Error.ValidationError) {
      return response.status(500).json( { errorMessage: err.message });
    } else if (err.code === 11000) {
      return response.status(500).json({
        errorMessage: 'Username and email need to be unique. Either username or email is already used.'
      });
    }
    return response.status(500).json({ errorMessage: "Algo deu muuuito errado" });
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await PropriedadeModel.findOne({ email: email });
    if (!user) {
      return response.status(400).json({ msg: "Usuário não cadastrado" });
    }
    if (await bcrypt.compare(password, user.passwordHash)) {
      delete user._doc.passwordHash;
      const token = generateToken(user);
      return response.status(200).json({ user: user, token: token });
    } else {
      return response.status(401).json({ msg: "Email ou senha inválido" });
    }
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

router.get("/perfil", isAuth, attachCurrentUser, async (request, response) => {
  try {
    const oneproperty = await PropriedadeModel
      .findById(request.currentUser._id, { passwordHash: 0 })
      .populate(["rebanho", "gastos", "ganhos", "tarefas"])
      .populate([ 
        {
          path: "rebanho",
          populate: { path: "dadosCruzamentos", model: "Cruzamento" },
        },
        {
          path: "rebanho",
          populate: { path: "estadaCurral", model: "CurralPermanencia" },
        },
        {
          path: "rebanho",
          populate: { path: "historico", model: "Historico" },
        },
        { path: "rebanho", populate: { path: "pesagem", model: "Pesagem" } },
        {
          path: "rebanho",
          populate: { path: "producaoLeite", model: "Litragem" },
        },
      ]);
    return response.status(200).json(oneproperty);
  } catch (error) {
    console.log(error);
    return response.status(500).json({ msg: "Algo deu muuuito errado", error });
  }
});

router.put(
  "/alterardados",
  isAuth,
  attachCurrentUser,
  async (request, response) => {
    try {
      const update = await PropriedadeModel.findByIdAndUpdate(
        request.currentUser._id,
        { ...request.body },
        { new: true, runValidators: true }
      );
      return response.status(200).json(update);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ msg: "Algo deu muuuito errado" });
    }
  }
);

router.put(
  "/trocarsenha",
  isAuth,
  attachCurrentUser,
  async (request, response) => {
    try {
      const { password } = request.body;

      if (
        !password ||
        !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z$*!&@#]{8,}$/)
      ) {
        return response.status(400).json({
          message:
            "Sua senha não possui os requisitos de segurança necessários à criação da conta",
        });
      }
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const updatedUser = await PropriedadeModel.findByIdAndUpdate(
        request.currentUser._id,
        {
          passwordHash: hashedPassword,
        }
      );
      delete updatedUser._doc.passwordHash;
      return response.status(201).json(updatedUser);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ msg: "Algo deu muuuito errado" });
    }
  }
);

router.delete(
  "/delete",
  isAuth,
  attachCurrentUser,
  async (request, response) => {
    try {
      const id = request.currentUser._id;
      const deleteData = await PropriedadeModel.findByIdAndDelete(id);
      await CowModel.deleteMany({ creator: id });
      await CruzamentoModel.deleteMany({ creator: id });
      await CurralPermanenciaModel.deleteMany({ creator: id });
      await HistoricoModel.deleteMany({ creator: id });
      await LitragemModel.deleteMany({ creator: id });
      await PesagemModel.deleteMany({ creator: id });
      await GanhoModel.deleteMany({ creator: id });
      await GastoModel.deleteMany({ creator: id });
      await TarefaModel.deleteMany({ creator: id });
      return response.status(200).json(deleteData);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ msg: "Algo deu muuuito errado" });
    }
  }
);

export default router;
