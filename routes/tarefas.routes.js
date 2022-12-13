import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import userIsCreator from "../middlewares/userIsCreator.js";
import PropriedadeModel from "../models/propriedade.models.js";
import TarefaModel from "../models/tarefa.models.js";
const router = express.Router();

const basemodel = TarefaModel;
const relationModel = PropriedadeModel;

router.get(
  "/:id",
  isAuth,
  attachCurrentUser,
  userIsCreator(basemodel),
  async (request, response) => {
    try {
      return response.status(200).json(request.currentData);
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ errorMessage: "Algo deu muuuito errado" });
    }
  }
);

router.post("/new", isAuth, attachCurrentUser, async (request, response) => {
  try {
    const id = request.currentUser._id;
    const newData = await basemodel.create({
      ...request.body,
      creator: id,
    });
    await relationModel.findByIdAndUpdate(id, {
      $push: { tarefas: newData._id },
    });

    return response.status(201).json(newData);
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ errorMessage: "Algo deu muuuito errado" });
  }
});

router.put("/change/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const update = await basemodel.findByIdAndUpdate(
      id,
      { ...request.body },
      { new: true, runValidators: true }
    );
    return response.status(200).json(update);
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ errorMessage: "Algo deu muuuito errado" });
  }
});

router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteData = await basemodel.findByIdAndDelete(id);
    await relationModel.findByIdAndUpdate(deleteData.creator, {
      $pull: { tarefas: id },
    });
    return response.status(200).json(deleteData);
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ errorMessage: "Algo deu muuuito errado" });
  }
});

export default router;
