import express from "express";
import { stringEqualizer } from "../helpers/helpers.js";
import CowModel from "../models/cow.models.js";
import CruzamentoModel from "../models/cruzamento.models.js";
import CurralPermanenciaModel from "../models/curralPermanencia.models.js";
import HistoricoModel from "../models/historico.models.js";
import LitragemModel from "../models/litragem.models.js";
import PesagemModel from "../models/pesagem.models.js";
const router = express.Router();
const basemodel = CowModel;

router.get("/", async (request, response) => {
  try {
    const cattle = await basemodel
      .find()
      .populate([
        "dadosCruzamentos",
        "pesagem",
        "producaoLeite",
        "historico",
        "estadaCurral",
      ]);
    return response.status(200).json(cattle);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

router.get("/random", async (request, response) => {
  try {
    const cattle = await basemodel.find();
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
    const oneCaw = await basemodel
      .findById(id)
      .populate([
        "dadosCruzamentos",
        "pesagem",
        "producaoLeite",
        "historico",
        "estadaCurral",
      ]);
    if (!oneCaw) {
      return response(404).json({ msg: "usuário não encontrado" });
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
    const cattle = await basemodel.find();
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
    const newCow = await basemodel.create(request.body);
    return response.status(201).json(newCow);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
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
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

router.delete("/delete/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const deleteCow = await basemodel.findByIdAndDelete(id);
    await CruzamentoModel.deleteMany({ animal: id });
    await CurralPermanenciaModel.deleteMany({ animal: id });
    await HistoricoModel.deleteMany({ animal: id });
    await LitragemModel.deleteMany({ animal: id });
    await PesagemModel.deleteMany({ animal: id });
    return response.status(200).json(deleteCow);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

export default router;
