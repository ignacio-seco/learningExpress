import express from "express";
import { v4 as uuidv4 } from "uuid";
import { formatDateToDefault } from "../helpers/helpers.js";

const router = express.Router();

const data = [{teste:"teste"}];
router.get("/", (request, response) => {
  return response.status(200).json(data);
});
router.get("/setor/:setor", (request, response) => {
  const { setor } = request.params;
  let processosDoSetor = data.filter((el) => (el.setor = setor));
  return response.status(200).json(processosDoSetor);
});

router.get("/random", (request, response) => {
  let randomIndex = Math.floor(Math.random() * (data.length - 0) + 0);
  return response.status(200).json(data[randomIndex]);
});

router.post("/new", (request, response) => {
  const newData = {
    ...request.body,
    id: uuidv4(),
    initDate: formatDateToDefault(new Date(Date.now())),
  };
  data.push(newData);
  return response.status(201).json(data);
});

router.put("/change/:id", (request, response) => {
  const { id } = request.params;
  const index = data.findIndex((el) => el.id === id);
  data[index] = { ...data[index], ...request.body };
  return response.status(200).json(data[index]);
});

router.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  let index = data.findIndex((el) => el.id === id);
  data.splice(index, 1);
  return response.status(200).json(data);
});

export default router;
