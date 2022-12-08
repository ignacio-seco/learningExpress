import express from 'express';
import attachCurrentUser from '../middlewares/attachCurrentUser.js';
import isAuth from '../middlewares/isAuth.js';
import userIsCreator from '../middlewares/userIsCreator.js';
import CowModel from '../models/cow.models.js';
import CruzamentoModel from '../models/cruzamento.models.js';
import CurralPermanenciaModel from '../models/curralPermanencia.models.js';
import HistoricoModel from '../models/historico.models.js';
import LitragemModel from '../models/litragem.models.js';
import PesagemModel from '../models/pesagem.models.js';
import PropriedadeModel from '../models/propriedade.models.js';
const router = express.Router();
const basemodel = CowModel;
const relationModel = PropriedadeModel;

router.get(
  '/:id',
  isAuth,
  attachCurrentUser,
  userIsCreator(basemodel),
  async (request, response) => {
    try {
      const { id } = request.params;
      const oneCaw = await basemodel
        .findById(id)
        .populate([
          'dadosCruzamentos',
          'pesagem',
          'producaoLeite',
          'historico',
          'estadaCurral',
        ]);
      return response.status(200).json(oneCaw);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ msg: 'Algo deu muuuito errado' });
    }
  }
);
router.post(
  '/new',
  isAuth,
  attachCurrentUser,
  userIsCreator(basemodel),
  async (request, response) => {
    try {
      const id = request.currentUser._id;
      const newCow = await basemodel.create({ ...request.body, creator: id });
      await relationModel.findByIdAndUpdate(id, {
        $push: { rebanho: newCow._id },
      });

      return response.status(201).json(newCow);
    } catch (err) {
      console.log(err);
      return response.status(500).json({ msg: 'Algo deu muuuito errado' });
    }
  }
);

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
    const deleteCow = await basemodel.findByIdAndDelete(id);
    await relationModel.findByIdAndUpdate(deleteCow.creator, {
      $pull: { rebanho: id },
    });
    await CruzamentoModel.deleteMany({ animal: id });
    await CurralPermanenciaModel.deleteMany({ animal: id });
    await HistoricoModel.deleteMany({ animal: id });
    await LitragemModel.deleteMany({ animal: id });
    await PesagemModel.deleteMany({ animal: id });
    return response.status(200).json(deleteCow);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

export default router;
