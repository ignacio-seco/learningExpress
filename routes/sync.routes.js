import express, { request } from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import CowModel from "../models/cow.models.js";
import CruzamentoModel from "../models/cruzamento.models.js";
import CurralPermanenciaModel from "../models/curralPermanencia.models.js";
import HistoricoModel from "../models/historico.models.js";
import LitragemModel from "../models/litragem.models.js";
import PesagemModel from "../models/pesagem.models.js";
import PropriedadeModel from "../models/propriedade.models.js";
import GanhoModel from "../models/ganhos.models.js";
import GastoModel from "../models/gastos.models.js";
import TarefaModel from "../models/tarefa.models.js";
import deepSort from "../helpers/deepSort.js";
const router = express.Router();
const modelCollections = {
  cow: CowModel,
  cruzamento: CruzamentoModel,
  curral: CurralPermanenciaModel,
  historico: HistoricoModel,
  litragem: LitragemModel,
  pesagem: PesagemModel,
  propriedade: PropriedadeModel,
  ganhos: GanhoModel,
  gastos: GastoModel,
  tarefa: TarefaModel,
};

async function createNewCows(obj, userid) {
  try {
    let updateObj = { ...obj };
    let keysToCheck = Object.keys(updateObj);
    console.log("estas são as chaves sendo checadas", keysToCheck);
    let cowsWithoutRegistration = keysToCheck.filter((key) => {
      return (
        updateObj[key][0]._id === "" &&
        !updateObj[key][0].dadosServidor.deletado &&
        updateObj[key][0].dadosServidor.colecao === "cow"
      );
    });
    console.log("estas são as vacas sem registro", cowsWithoutRegistration);

    // Create an array of promises that will be resolved when all calls to CowModel.create are complete
    const promises = cowsWithoutRegistration.map(async (cow) => {
      try {
        let cowToRegister = updateObj[cow][0];
        let populaveis = cowToRegister.dadosServidor.populaveis;
        populaveis.forEach((key) => delete cowToRegister[key]);
        delete cowToRegister._id;
        console.log("this is the data to register", cowToRegister);
        const newCow = await CowModel.create({
          ...cowToRegister,
          creator: userid,
        });
        await PropriedadeModel.findByIdAndUpdate(newCow.creator, {
          $push: { rebanho: newCow._id },
        });
        console.log(
          "======================>this is the new created data",
          newCow
        );
        delete updateObj[cow];
      } catch (err) {
        console.log(err);
      }
    });

    // Wait for all promises to resolve
    await Promise.all(promises);

    return updateObj;
  } catch (err) {
    console.log(err);
  }
}


async function itemUpdate(id, obj, colecao) {
  try {
    let populaveis = obj.dadosServidor.populaveis;
    populaveis.length > 0 && populaveis.forEach((key) => delete obj[key]);
    let newData;
    console.log("objeto passado para o itemUpdate", obj);
    if (obj._id === "") {
      delete obj._id;
      if (obj.dadosServidor.deletado) {
        console.log("objeto não será incluído porque já foi deletado!");
        return;
      } else {
        let originalAnimal;
        switch (obj.dadosServidor.colecao) {
          case "cow":
            //codigo da coleção vaca
            const newCow = await CowModel.create({ ...obj });
            await PropriedadeModel.findByIdAndUpdate(newCow.creator, {
              $push: { rebanho: newCow._id },
            });
            console.log("this is the new created data", newCow);
            break;
          case "cruzamento":
            //codigo da coleção cruzamento
            originalAnimal = await CowModel.findOne({ uuid: obj.animaluuid });
            console.log(
              `this is the data we found for originalAnimal`,
              originalAnimal
            );
            newData = await CruzamentoModel.create({
              ...obj,
              animal: originalAnimal._id,
            });
            await CowModel.findByIdAndUpdate(newData.animal, {
              $push: { dadosCruzamentos: newData._id },
            });
            console.log("this is the new created data", newData);

            break;
          case "curral":
            //codigo da coleção curral
            originalAnimal = await CowModel.findOne({ uuid: obj.animaluuid });
            console.log(
              `this is the data we found for originalAnimal`,
              originalAnimal
            );
            newData = await CurralPermanenciaModel.create({
              ...obj,
              animal: originalAnimal._id,
            });
            await CowModel.findByIdAndUpdate(newData.animal, {
              $push: { estadaCurral: newData._id },
            });
            console.log("this is the new created data", newData);

            break;
          case "historico":
            //codigo da coleção historico
            originalAnimal = await CowModel.findOne({ uuid: obj.animaluuid });
            console.log(
              `this is the data we found for originalAnimal`,
              originalAnimal
            );
            newData = await HistoricoModel.create({
              ...obj,
              animal: originalAnimal._id,
            });
            await CowModel.findByIdAndUpdate(newData.animal, {
              $push: { historico: newData._id },
            });
            console.log("this is the new created data", newData);

            break;
          case "litragem":
            //codigo da coleção litragem
            originalAnimal = await CowModel.findOne({ uuid: obj.animaluuid });
            console.log(
              `this is the data we found for originalAnimal`,
              originalAnimal
            );
            newData = await LitragemModel.create({
              ...obj,
              animal: originalAnimal._id,
            });
            await CowModel.findByIdAndUpdate(newData.animal, {
              $push: { producaoLeite: newData._id },
            });
            console.log("this is the new created data", newData);
            break;
          case "pesagem":
            //codigo da coleção pesagem
            originalAnimal = await CowModel.findOne({ uuid: obj.animaluuid });
            console.log(
              `this is the data we found for originalAnimal`,
              originalAnimal
            );
            newData = await PesagemModel.create({
              ...obj,
              animal: originalAnimal._id,
            });
            await CowModel.findByIdAndUpdate(newData.animal, {
              $push: { pesagem: newData._id },
            });
            console.log("this is the new created data", newData);

            break;
          case "ganhos":
            //codigo da coleção ganhos
            newData = await GanhoModel.create({
              ...obj,
            });
            await PropriedadeModel.findByIdAndUpdate(newData.creator, {
              $push: { ganhos: newData._id },
            });
            console.log("this is the new created data", newData);

            break;
          case "gastos":
            //codigo da coleção gastos
            newData = await GastoModel.create({
              ...obj,
            });
            await PropriedadeModel.findByIdAndUpdate(newData.creator, {
              $push: { gastos: newData._id },
            });
            console.log("this is the new created data", newData);
            break;
          case "tarefa":
            //codigo da coleção tarefa
            newData = await TarefaModel.create({
              ...obj,
            });
            await PropriedadeModel.findByIdAndUpdate(newData.creator, {
              $push: { tarefas: newData._id },
            });
            console.log("this is the new created data", newData);
            break;
        }
      }
    } else {
      //situação em que o objeto apenas deve ser atualziado
      let serverData = await colecao.findById(obj._id);
      if (!serverData) {
        console.log(
          "this item was removed by another sync and will be ignored"
        );
      } else {
        console.log("este é o item encontrado no servidor", serverData);
        if (
          obj.dadosServidor.lastUpdate > serverData.dadosServidor.lastUpdate
        ) {
          let updatedItem = await colecao.findByIdAndUpdate(obj._id, {
            ...obj,
          });
          console.log("this is the updatedobject on the server", updatedItem);
        } else {
          console.log("there was no need to update the ", id, " item");
          return;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function createAndUpdate(dataObj, models) {
  try {
    let keysToCheck = Object.keys(dataObj);
    await keysToCheck.forEach(async (key) => {
      console.log("this is the _ID we are starting to check for update", key);
      let body = dataObj[key][0];
      let model = models[body.dadosServidor.colecao];
      await itemUpdate(key, body, model);
    });
  } catch (err) {
    console.log(err);
  }
}

async function itemToDelete(id, colecao) {
  try {
    switch (colecao) {
      case "cow":
        //codigo da coleção vaca
        const deleteCow = await CowModel.findByIdAndDelete(id);
        await PropriedadeModel.findByIdAndUpdate(deleteCow.creator, {
          $pull: { rebanho: id },
        });
        await CruzamentoModel.deleteMany({ animal: id });
        await CurralPermanenciaModel.deleteMany({ animal: id });
        await HistoricoModel.deleteMany({ animal: id });
        await LitragemModel.deleteMany({ animal: id });
        await PesagemModel.deleteMany({ animal: id });
        break;
      case "cruzamento":
        //codigo da coleção cruzamento
        const deleteCruzamentoData = await CruzamentoModel.findByIdAndDelete(
          id
        );
        await CowModel.findByIdAndUpdate(deleteCruzamentoData.animal, {
          $pull: { dadosCruzamentos: id },
        });
        break;
      case "curral":
        //codigo da coleção curral
        const deleteCurralData = await CurralPermanenciaModel.findByIdAndDelete(
          id
        );
        await CowModel.findByIdAndUpdate(deleteCurralData.animal, {
          $pull: { estadaCurral: id },
        });
        break;
      case "historico":
        //codigo da coleção historico
        const deleteHistoricoData = await HistoricoModel.findByIdAndDelete(id);
        await CowModel.findByIdAndUpdate(deleteHistoricoData.animal, {
          $pull: { historico: id },
        });

        break;
      case "litragem":
        //codigo da coleção litragem
        const deleteLitragemData = await LitragemModel.findByIdAndDelete(id);
        await CowModel.findByIdAndUpdate(deleteLitragemData.animal, {
          $pull: { producaoLeite: id },
        });
        break;
      case "pesagem":
        //codigo da coleção pesagem
        const deletePesagemData = await PesagemModel.findByIdAndDelete(id);
        await CowModel.findByIdAndUpdate(deletePesagemData.animal, {
          $pull: { pesagem: id },
        });
        break;
      case "ganhos":
        //codigo da coleção ganhos
        const deleteGanhosData = await GanhoModel.findByIdAndDelete(id);
        await PropriedadeModel.findByIdAndUpdate(deleteGanhosData.creator, {
          $pull: { ganhos: id },
        });
        break;
      case "gastos":
        //codigo da coleção gastos
        const deleteGastoData = await GastoModel.findByIdAndDelete(id);
        await PropriedadeModel.findByIdAndUpdate(deleteGastoData.creator, {
          $pull: { gastos: id },
        });
        break;
      case "tarefa":
        //codigo da coleção tarefa
        const deleteTarefaData = await TarefaModel.findByIdAndDelete(id);
        await PropriedadeModel.findByIdAndUpdate(deleteTarefaData.creator, {
          $pull: { tarefas: id },
        });
        break;
    }
  } catch (err) {
    console.log(err);
  }
}

async function filterAndDelete(dataObj) {
  try {
    let keysToCheck = Object.keys(dataObj);
    let onlyDeletedKeys = keysToCheck.filter(
      (key) =>
        dataObj[key][0].dadosServidor.deletado && dataObj[key][0]._id !== ""
    );
    await onlyDeletedKeys.forEach(async (key) => {
      let colecao = dataObj[key][0].dadosServidor.colecao;
      let idKey = dataObj[key][0]._id;
      await itemToDelete(idKey, colecao);
    });
  } catch (err) {
    console.log(err);
  }
}

router.put("/", isAuth, attachCurrentUser, async (request, response) => {
  try {
    console.log("este é o objeto que veio na requisição", request.body);
    let Arr = [request.body]; //colocar o objeto em uma array para a função deepSort também puxar a chave no objeto raiz
    let sortedArray = deepSort(Arr, "uuid"); //passo 1
    let updateArray = await createNewCows(sortedArray, request.currentUser._id); //passo 2, a função retorna os dados da sorted array, exceto
    createAndUpdate(updateArray, modelCollections); //passo 3
    filterAndDelete(updateArray); //passo 4
    const oneproperty = await PropriedadeModel.findById(
      request.currentUser._id,
      { passwordHash: 0 }
    )
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
      console.log("============================================================================>FIM DA FUNÇÃO<=====================================================")
    return response.status(200).json(oneproperty);
  } catch (err) {
    console.log(err);
    return response
      .status(500)
      .json({ errorMessage: "Algo deu muuuito errado" });
  }
});

export default router;
