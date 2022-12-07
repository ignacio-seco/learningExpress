//para continuar amanhã => seguir o guia da professora Karen => https://karenokasaki.notion.site/karenokasaki/Autentica-o-852509954c1747f6a156606e433ea04d

import express from 'express';
import UserModel from '../models/user.models.js';
import PropriedadeModel from '../models/propriedade.models.js';
const router = express.Router();
const basemodel = UserModel;
const Backup = PropriedadeModel;

router.post('/signup', async (request, response) => {
  try {
    const newUser = await basemodel.create(request.body);
    return response.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ msg: 'Algo deu muuuito errado' });
  }
});

router.post('/login', async (request, response) => {
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

/*router.put('/change/:id', async (request, response) => {
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
});*/

export default router;
