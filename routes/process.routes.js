import express from "express";
import { v4 as uuidv4 } from "uuid";
import { formatDateToDefault, stringEqualizer } from "../helpers/helpers.js";

const router = express.Router();

const data = [{teste:"teste"}];
router.get("/", (request, response) => {
  return response.status(200).json(data);
});
router.get("/gado/:sexo", (request, response) => {
  const { sexo } = request.params;
  let filterSexo = data.filter((el) => (stringEqualizer(el.sexo) = stringEqualizer(sexo)));
  return response.status(200).json(processosDoSetor);
});

router.get("/random", (request, response) => {
  let randomIndex = Math.floor(Math.random() * (data.length - 0) + 0);
  return response.status(200).json(data[randomIndex]);
});

router.post("/new", (request, response) => {
  const newData = {
    ...request.body,
    initDate: formatDateToDefault(new Date(Date.now())),
  };
  data.push(newData);
  return response.status(201).json(data);
});

router.put("/change/:id", (request, response) => {
  const { id } = request.params;
  const index = data.findIndex((el) => el._id === id);
  data[index] = { ...data[index], ...request.body };
  return response.status(200).json(data[index]);
});

router.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  let index = data.findIndex((el) => el._id === id);
  data.splice(index, 1);
  return response.status(200).json(data);
});

export default router;
