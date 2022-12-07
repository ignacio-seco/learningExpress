import express from 'express';
import GanhoModel from '../models/ganhos.models.js';
import PropriedadeModel from '../models/propriedade.models.js';
const router = express.Router();

const basemodel = GanhoModel;
const relationModel = PropriedadeModel;

router.get('/', async (request, response) => {
  try {
    const allData = await basemodel.find();
    return response.status(200).json(allData);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.post('/new/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const newData = await basemodel.create({
      ...request.body,
      propriedade: id,
    });
    await relationModel.findByIdAndUpdate(id, {
      controleFinanceiro: {
        $push: { ganhos: newData._id },
      },
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
    await relationModel.findByIdAndUpdate(deleteData.propriedade, {
      controleFinaneciero: {
        $pull: { ganhos: id },
      },
    });
    return response.status(200).json(deleteData);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

export default router;
