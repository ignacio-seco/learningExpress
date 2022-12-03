import express from 'express';
import PropertyBackupModel from '../models/propertyBackup.models.js';
import PropriedadeModel from '../models/propriedade.models.js';
const router = express.Router();
const basemodel = PropriedadeModel;
const Backup = PropertyBackupModel;

router.get('/', async (request, response) => {
  try {
    const propriedade = await basemodel.find();
    return response.status(200).json(propriedade);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const oneproperty = await basemodel.findById(id);
    if (!oneproperty) {
      return response(404).json({ msg: 'propriedade não encontrada' });
    }
    return response.status(200).json(oneproperty);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.post('/new', async (request, response) => {
  try {
    const newProperty = await basemodel.create(request.body);
    const newBackupData = { ...newProperty._doc };
    await delete newBackupData.__v;
    console.log(newBackupData);
    await Backup.create(newBackupData);
    return response.status(201).json(newProperty);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.put('/change/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const originalData = await basemodel.findById(id);
    const newBackup = { ...originalData._doc, oldId: originalData._doc._id };
    const maxRev = newBackup.backupVersion - 5;//5 aqui é a quantidade máxima de backups de cada propriedade rural
    console.log(`this is the MaxRev ${maxRev}`);
    delete newBackup._id;
    await Backup.create(newBackup);
    await Backup.deleteMany({ oldId: id } && { backupVersion: maxRev });
    const newRequestBody = {
      ...request.body,
      __v: request.body.__v + 1,
      backupVersion: request.body.backupVersion + 1,
      revTime: new Date(Date.now()),
    };
    const update = await basemodel.findByIdAndUpdate(
      id,
      newRequestBody, //sim... o objeto é completamente substituído pelo que estiver no cache do usuário
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
    const deleteproperty = await basemodel.findByIdAndDelete(id);
    return response.status(200).json(deleteproperty);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

export default router;
