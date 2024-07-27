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

router.get('/lists/:listId/todos', (req, res) => {
  const { listId } = req.params;

  const lists = readData();
  const list = lists.find(list => list.id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  res.json(list.todos);
});


router.post('/lists/:listId/todos', (req, res) => {
  const { description } = req.body;
  const { listId } = req.params;

  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  const lists = readData();
  const list = lists.find(list => list.id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  const todo = { id: uuidv4(), description, isComplete: false };
  list.todos.push(todo);

  writeData(lists);

  res.status(201).json(todo);
});

router.delete('/lists/:listId/todos/:todoId', (req, res) => {
  const { listId, todoId } = req.params;

  const lists = readData();
  const list = lists.find(list => list.id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  list.todos = list.todos.filter(todo => todo.id !== todoId);

  writeData(lists);

  res.status(204).end();
});

router.patch('/lists/:listId/todos/:todoId', (req, res) => {
  const { listId, todoId } = req.params;

  const { isComplete } = req.body;



  if (typeof isComplete === "undefined") {
    return res.status(400).json({ error: 'isComplete is required' });
  }

  const lists = readData();

  const list = lists.find(list => list.id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  const todo = list.todos.find(todo => todo.id === todoId);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todo.isComplete = isComplete;


  writeData(lists);

  res.json(todo);
});

export default router;
