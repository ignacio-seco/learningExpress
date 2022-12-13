import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import userIsCreator from "../middlewares/userIsCreator.js";
import CowModel from "../models/cow.models.js";

import HistoricoModel from "../models/historico.models.js";
const router = express.Router();

const basemodel = HistoricoModel;
const relationModel = CowModel;

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

router.post(
  "/new/:animalId",
  isAuth,
  attachCurrentUser,
  async (request, response) => {
    try {
      const id = request.currentUser._id;
      const { animalId } = request.params;
      const newData = await basemodel.create({
        ...request.body,
        animal: animalId,
        creator: id,
      });
      await relationModel.findByIdAndUpdate(animalId, {
        $push: { historico: newData._id },
      });

      return response.status(201).json(newData);
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ errorMessage: "Algo deu muuuito errado" });
    }
  }
);

router.put(
  "/change/:id",
  isAuth,
  attachCurrentUser,
  userIsCreator(basemodel),
  async (request, response) => {
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
  }
);

router.delete(
  "/delete/:id",
  isAuth,
  attachCurrentUser,
  userIsCreator(basemodel),
  async (request, response) => {
    try {
      const { id } = request.params;
      const deleteData = await basemodel.findByIdAndDelete(id);
      await relationModel.findByIdAndUpdate(deleteData.animal, {
        $pull: { historico: id },
      });
      return response.status(200).json(deleteData);
    } catch (err) {
      console.log(err);
      return response
        .status(500)
        .json({ errorMessage: "Algo deu muuuito errado" });
    }
  }
);

export default router;
