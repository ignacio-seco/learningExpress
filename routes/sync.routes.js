import express from "express";
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
function deepSort(conjunto, key) {
  function isAnObject(testedObject) {
    if (
      typeof testedObject === "object" &&
      !Array.isArray(testedObject) &&
      testedObject !== null
    ) {
      return true;
    } else {
      return false;
    }
  }

  let result = {};
  let tTest = conjunto;
  let arr = [0];
  let i = 0;
  let t;
  let lTest;
  let tType;
  let foundKey;
  let fkTest;
  if (isAnObject(tTest)) {
    lTest = Object.keys(tTest);
  } else {
    lTest = tTest;
  } //observe que isso faz com que lTest seja sempre uma array...

  for (; arr.length > 0; ) {
    //console.log(arr)
    for (; arr[i] < lTest.length; ) {
      if (isAnObject(tTest)) {
        tType = tTest[lTest[arr[i]]];
      } else {
        tType = tTest[arr[i]];
      }
      console.log(
        `This array represent the coordinates that the for loop is looking at [ ${arr} ]`
      ); //O último valor representa a posição que está sendo analisada, enquanto os valores anteriores o caminho que está sendo percorrido até esta posição.
      if (isAnObject(tType)) {
        //aqui começa a formula quando o valor analizado em tTest[arr[i]] é um objeto e poderia ter a key procurada, passos, necessários 1- se tiver a key, fazer o cadastro e procurar no próximo nivel de arr[i], se não tiver a chave, fazer com que i suba de nível e procurar por objetos dentro de objetos ou arrays.
        if (key in tType) {
          foundKey = tType[key];
          //situação em que a chave foi encontrada no objeto
          if (isAnObject(foundKey)) {
            //situação em que a chave é uma array de valores
            fkTest = Object.keys(foundKey);
            if (fkTest.length > 0) {
              for (t = 0; t < fkTest.length; t++) {
                if (!(foundKey[fkTest[t]] in result)) {
                  //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
                  result[foundKey[fkTest[t]]] = [];
                  result[foundKey[fkTest[t]]].push(tType);
                } // situação em que a chave já existia no conjunto result
                else {
                  result[foundKey[fkTest[t]]].push(tType);
                }
              }
              {
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              }
            } else {
              //situação em que a chave encontrada é uma array vazia
              if (!(`empty` in result)) {
                //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
                result[`empty`] = [];
                result[`empty`].push(tType);
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              } // situação em que a chave já existia no conjunto result
              else {
                result[`empty`].push(tType);
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              }
            }
          } else if (Array.isArray(foundKey)) {
            //situação em que a chave é uma array de valores
            if (foundKey.length > 0) {
              for (t = 0; t < foundKey.length; t++) {
                if (!(foundKey[t] in result)) {
                  //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
                  result[foundKey[t]] = [];
                  result[foundKey[t]].push(tType);
                } // situação em que a chave já existia no conjunto result
                else {
                  result[foundKey[t]].push(tType);
                }
              }
              {
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              }
            } else {
              //situação em que a chave encontrada é uma array vazia
              if (!(`empty` in result)) {
                //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
                result[`empty`] = [];
                result[`empty`].push(tType);
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              } // situação em que a chave já existia no conjunto result
              else {
                result[`empty`].push(tType);
                if (Object.keys(tType).length > 0) {
                  // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                  i = i + 1;
                  arr[i] = 0;
                  tTest = tType;
                  lTest = Object.keys(tTest);
                } else {
                  arr[i] = arr[i] + 1;
                }
              }
            }
          } else {
            //situação em que a chave encontrada é um valor
            if (!(foundKey in result)) {
              //aqui testamos se já existe uma key com o nome do valor da chave encontrada. Se tiver o objeto é cadastrado nesse array, se não tiver é criada a chave como o array e o objeto é colocado nela. No primeiro if a chave não existe e precisa ser criada
              result[foundKey] = [];
              result[foundKey].push(tType);
              if (Object.keys(tType).length > 0) {
                // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                i = i + 1;
                arr[i] = 0;
                tTest = tType;
                lTest = Object.keys(tTest);
              } else {
                arr[i] = arr[i] + 1;
              }
            } // situação em que a chave já existia no conjunto result
            else {
              result[foundKey].push(tType);
              if (Object.keys(tType).length > 0) {
                // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
                i = i + 1;
                arr[i] = 0;
                tTest = tType;
                lTest = Object.keys(tTest);
              } else {
                arr[i] = arr[i] + 1;
              }
            }
          }
        } //aqui encerra a situação em que a chave foi encontrada.
        else {
          //situação em que a chave não foi encontrada no objeto
          if (Object.keys(tType).length > 0) {
            // é necessário garantir que não estamos olhando um objeto vazio porque se atualizarmos a profundidade da arvore com objeto vazio a função retornará um erro ao não conseguir ler a propriedade do objeto que não existe.
            i = i + 1;
            arr[i] = 0;
            tTest = tType;
            lTest = Object.keys(tTest);
          } else {
            arr[i] = arr[i] + 1;
          }
        }
      } else if (Array.isArray(tType)) {
        //aqui começa as ações se o item que está sendo analisado é uma array, e não pode ter a chave: passos, apenas subir um nível em arr[i] e atualizar o ltest para que represente o novo tamanho do novo nível do arr[i]
        if (tType.length > 0) {
          i = i + 1;
          arr[i] = 0;
          tTest = tType;
          lTest = tTest;
        } else {
          arr[i] = arr[i] + 1;
        }
      } else {
        arr[i] = arr[i] + 1; //nesse caso o item é um valor e o loop deve apenas continuar sem atualizar o lTest
      }
    }
    {
      //aqui é a ação a ser tomada quando o o valor de arr[i] ultrapassar o valor de length da array ltest. É melhor cadastrar a regra para conter o loop do primeiro for aqui uma vez que, aqui, é possível utilizar regras if enquanto no loop for não é...
      if (arr.length > 1) {
        console.log(`This is the array before the pop() comand [${arr}]`);
        i = i - 1; //isso retrocede a profundidade paara o nível anterior
        arr[i] = arr[i] + 1; //isso faz com que o loop não olhe o mesmo item novamente e siga em frente com a checagem
        arr.pop(); ///isso diminui o valor de arr.length e é necessário para o primeiro loop não ser eterno.
        console.log(`This is the new array after the pop() comand [${arr}]`);
        //nessa etapa é necessário reconstruir o tTest e o lTest para que eles estejam em conformidade com os valores que serão analisados, para isso usamos as coordenadas que já existem na array arr. O problema é que é necessário checar, para cada valor desse, se o que está ali é um objeto ou um array e no caso de objeto cadastrar a key no tTest e não o valor como fazemos com uma array. Ao final, atualizar o valor ltest para garantir que seja tratado como uma array ainda que o tTest final seja um objeto.
        tTest = conjunto;
        for (let y = 0; y < arr.length - 1; y++) {
          if (isAnObject(tTest)) {
            tTest = tTest[Object.keys(tTest)[arr[y]]];
          } else {
            tTest = tTest[arr[y]];
          }
        }
        {
          if (isAnObject(tTest)) {
            lTest = Object.keys(tTest);
          } else {
            lTest = tTest;
          }
        }
        //aqui comecei a inserir a checagem de undefined
      } //aqui se encerra o if
      else {
        arr.pop();
        ///nessa situação a formula se caminha para a derradeira conclusão.
      }
    }
  }
  {
    console.log("this function is finished");
    //resultado quando toda formula encerra
    return result;
  }
}

function setToMongoFormat(updateObject, idkey) {
  function isAnObject(testedObject) {
    if (
      typeof testedObject === "object" &&
      !Array.isArray(testedObject) &&
      testedObject !== null
    ) {
      return true;
    } else {
      return false;
    }
  }
  let itensToUpdate = { ...updateObject };
  let idArray = Object.keys(itensToUpdate);
  console.log("estãos são as chaves recebidas para update", idArray);
  idArray.forEach((id) => {
    console.log("that is the object i am setting to mongo format", id);
    let document = itensToUpdate[id][0];
    let keys = Object.keys(document);
    keys.forEach((key) => {
      if (Array.isArray(document[key])) {
        let newArray = [];
        let arrayOfitens = document[key];
        arrayOfitens.forEach((element) => {
          if (isAnObject(element) && idkey in element) {
            newArray.push(element[idkey]);
          } else {
            newArray.push(element);
          }
        });
        document[key] = newArray;
      }
    });
  });
  return itensToUpdate;
}

async function itemUpdate(id, obj, colecao) {
  let populaveis = obj.dadosServidor.populaveis;
  populaveis.length > 0 && populaveis.forEach((key) => delete obj[key]);
  let newData;
  console.log("objeto passado para o itemUpdate", obj);
  let serverData = await colecao.findById(id);
  console.log("este é o item encontrado no servidor", serverData);
  if (!serverData) {
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
        newData = await CruzamentoModel.create({
          ...obj,
        });
        await CowModel.findByIdAndUpdate(newData.animal, {
          $push: { dadosCruzamentos: newData._id },
        });
        console.log("this is the new created data", newData);

        break;
      case "curral":
        //codigo da coleção curral
        newData = await CurralPermanenciaModel.create({
          ...obj,
        });
        await CowModel.findByIdAndUpdate(newData.animal, {
          $push: { estadaCurral: newData._id },
        });
        console.log("this is the new created data", newData);

        break;
      case "historico":
        //codigo da coleção historico
        newData = await HistoricoModel.create({
          ...obj,
        });
        await CowModel.findByIdAndUpdate(newData.animal, {
          $push: { historico: newData._id },
        });
        console.log("this is the new created data", newData);

        break;
      case "litragem":
        //codigo da coleção litragem
        newData = await LitragemModel.create({
          ...obj,
        });
        await CowModel.findByIdAndUpdate(newData.animal, {
          $push: { producaoLeite: newData._id },
        });
        console.log("this is the new created data", newData);
        break;
      case "pesagem":
        //codigo da coleção pesagem
        newData = await PesagemModel.create({
          ...obj,
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
  } else {
    //situação em que o objeto apenas deve ser atualziado
    if (obj.dadosServidor.lastUpdate > serverData.dadosServidor.lastUpdate) {
      let updatedItem = await colecao.findByIdAndUpdate(id, { ...obj });
      console.log("this is the updatedobject on the server", updatedItem);
    } else {
      console.log("there was no need to update the ", id, " item");
      return;
    }
  }
}

async function createAndUpdate(dataObj, models) {
  let keysToCheck = Object.keys(dataObj);
  await keysToCheck.forEach(async (key) => {
    console.log("this is the _ID we are starting to check for update", key);
    let body = dataObj[key][0];
    let model = models[body.dadosServidor.colecao];
    await itemUpdate(key, body, model);
  });
}

async function itemToDelete(id, colecao) {
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
      const deleteCruzamentoData = await CruzamentoModel.findByIdAndDelete(id);
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
}

async function filterAndDelete(dataObj) {
  let keysToCheck = Object.keys(dataObj);
  let onlyDeletedKeys = keysToCheck.filter(
    (key) => dataObj[key][0].dadosServidor.deletado
  );
  await onlyDeletedKeys.forEach(async (key) => {
    let colecao = dataObj[key][0].dadosServidor.colecao;
    await itemToDelete(key, colecao);
  });
}

router.put("/", isAuth, attachCurrentUser, async (request, response) => {
  try {
    console.log("este é o objeto que veio na requisição", request.body);
    let Arr = [request.body]; //colocar o objeto em uma array para a função deepSort também puxar a chave no objeto raiz
    let updateArray = await deepSort(Arr, "_id"); //passo 1
    let dataToPass = await setToMongoFormat(updateArray, "_id"); //passo2
    await createAndUpdate(dataToPass, modelCollections); //passo 3
    await filterAndDelete(dataToPass); //passo 4
    const oneproperty = await PropriedadeModel.findById(
      request.currentUser._id,
      { passwordHash: 0 }
    )
      .populate(["rebanho", "gastos", "ganhos", "tarefas"])
      .populate([
        {
          path: "rebanho",
          populate: { path: "dadosCruzamento", model: "Cruzamento" },
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
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: "Algo deu muuuito errado" });
  }
});

export default router;
