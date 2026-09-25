require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;
const API_KEY = process.env.API_KEY;

// Middleware
app.use(cors()); // Разрешаем запросы с любого origin (для разработки)
app.use(express.json()); // Парсинг JSON-тел запросов

// Middleware для проверки API-ключа
const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({ error: 'Доступ запрещён: неверный API-ключ' });
  }
  next();
};

// хранилище задач в памяти
let tasks = [
  { id: 1, text: 'Изучить Express.js', completed: false },
  { id: 2, text: 'Создать Todo-приложение', completed: false }
];
let nextId = 3;

// GET /api/tasks — получить все задачи
app.get('/api/tasks', checkApiKey, (req, res) => {
  res.json(tasks);
});

// POST /api/tasks — добавить новую задачу
app.post('/api/tasks', checkApiKey, (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Текст задачи не может быть пустым' });
  }
  const newTask = {
    id: nextId++,
    text: text.trim(),
    completed: false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id — обновить задачу
app.put('/api/tasks/:id', checkApiKey, (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }

  if (text !== undefined) tasks[taskIndex].text = text;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  res.json(tasks[taskIndex]);
});

// DELETE /api/tasks/:id — удалить задачу
app.delete('/api/tasks/:id', checkApiKey, (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Задача не найдена' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json(deletedTask);
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
  console.log(` API-ключ активен`);
});