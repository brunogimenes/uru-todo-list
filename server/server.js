import express from 'express';
import bodyParser from 'body-parser';
import todoRoutes from './routes/todos.js';
import listRoutes from './routes/lists.js';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api', todoRoutes);
app.use('/api', listRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});