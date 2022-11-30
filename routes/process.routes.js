import express from "express";
import { stringEqualizer } from "../helpers/helpers.js";
import CowModel from "../models/cow.models.js";
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const cattle = await CowModel.find();
    return response.status(200).json(cattle);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

router.get("/random", async (request, response) => {
  try {
    const cattle = await CowModel.find();
    let randomIndex = Math.floor(Math.random() * (cattle.length - 0) + 0);
    return response.status(200).json(cattle[randomIndex]);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo errado não deu certo" });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const oneCaw = await CowModel.findById(id);
    if (!oneCaw) {
      return response(404).json("usuário não encontrado");
    }
    return response.status(200).json(oneCaw);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

router.get("/filtro/:sexo", async (request, response) => {
  try {
    const { sexo } = request.params;
    const cattle = await CowModel.find();
    let filterSexo = cattle.filter(
      (el) => stringEqualizer(el.sexo) === stringEqualizer(sexo)
    );
    return response.status(200).json(filterSexo);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

router.post("/new", async (request, response) => {
  try {
    const newCow = await CowModel.create(request.body);
    return response.status(201).json(newCow);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

router.put("/change/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const update = await CowModel.findByIdAndUpdate(
      id,
      { ...request.body },
      { new: true, runValidators: true }
    );
    return response.status(200).json(update);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteCow = await CowModel.findByIdAndDelete(id);
    return response.status(200).json(deleteCow);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

export default router;
