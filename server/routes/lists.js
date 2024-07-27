import express from 'express';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const readData = () => {
  const data = fs.readFileSync('data/lists.json');
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync('data/lists.json', JSON.stringify(data, null, 2));
};

router.get('/lists', (req, res) => {
  const lists = readData();
  res.json(lists);
});

router.post('/lists', (req, res) => {
  const { name, description, color } = req.body;

  if (!name || !description || !color) {
    return res.status(400).json({ error: 'Name, description and color are required' });

  }


  const list = { id: uuidv4(), name, description, color, todos: [] };
  const lists = readData();
  lists.push(list);

  writeData(lists);

  res.status(201).json(list);
});

router.put('/lists/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, color } = req.body;

  if (!name || !description || !color) {
    return res.status(400).json({ error: 'Name, description and color are required' });
  }

  const lists = readData();
  const list = lists.find(list => list.id === id);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  list.name = name;
  list.description = description;
  list.color = color;

  writeData(lists);

  res.json(list);
});

router.delete('/lists/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }

  const lists = readData();
  const newList = lists.filter(list => list.id !== id);

  writeData(newList);

  res.status(204).end();
});

export default router;
