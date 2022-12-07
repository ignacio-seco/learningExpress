import express from 'express';
import CowModel from '../models/cow.models.js';
import CruzamentoModel from '../models/cruzamento.models.js';
import CurralPermanenciaModel from '../models/curralPermanencia.models.js';
import HistoricoModel from '../models/historico.models.js';
import LitragemModel from '../models/litragem.models.js';
import PesagemModel from '../models/pesagem.models.js';
import PropriedadeModel from '../models/propriedade.models.js';
import UserModel from '../models/user.models.js';
import GanhoModel from '../models/ganhos.models.js';
import GastoModel from '../models/gastos.models.js';
import TarefaModel from '../models/tarefa.models.js';
const router = express.Router();
const basemodel = PropriedadeModel;
const relationModel = UserModel;

router.get('/', async (request, response) => {
  try {
    const allData = await basemodel.find().populate('usuario');
    return response.status(200).json(allData);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const data = await basemodel
      .findById(id)
      .populate(['usuario', 'rebanho', 'tarefas', 'controleFinanceiro']);
    if (!data) {
      return response(404).json({ msg: 'propriedade não encontrado' });
    }
    return response.status(200).json(data);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.post('/new/:userId', async (request, response) => {
  try {
    const { userId } = request.params;
    const newData = await basemodel.create({
      ...request.body,
      usuario: userId,
    });
    await relationModel.findByIdAndUpdate(userId, {
      $push: { propriedades: newData._id },
    });

    return response.status(201).json(newData);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.put('/change/:id', async (request, response) => {
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
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.delete('/delete/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deleteData = await basemodel.findByIdAndDelete(id);
    await deleteData.rebanho.forEach(async (element) => {
      const cowToDelete = await CowModel.findByIdAndDelete(element);
      const newId = cowToDelete._id;
      await CruzamentoModel.deleteMany({ animal: newId });
      await CurralPermanenciaModel.deleteMany({ animal: newId });
      await HistoricoModel.deleteMany({ animal: newId });
      await LitragemModel.deleteMany({ animal: newId });
      await PesagemModel.deleteMany({ animal: newId });
    });
    await GanhoModel.deleteMany({ propriedade: id });
    await GastoModel.deleteMany({ propriedade: id });
    await TarefaModel.deleteMany({ propriedade: id });
    await relationModel.findByIdAndUpdate(deleteData.usuario, {
      $pull: { propriedades: id },
    });
    return response.status(200).json(deleteData);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

export default router;
