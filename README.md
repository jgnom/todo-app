# 📝 Todo App (Full-Stack)

Полноценное клиент-серверное приложение для управления списком задач (Todo List) с реализацией операций CRUD и базовой защитой API с помощью ключа.

## 🚀 Возможности

- ✅ **CRUD операции**: Создание, чтение, обновление и удаление задач.
- 🔒 **Защита API**: Все запросы к серверу защищены middleware, проверяющим заголовок `x-api-key`.
- ⚡ **Современный стек**: React + Vite на фронтенде, Express.js на бэкенде.
- 💾 **Хранение данных**: In-memory массив (данные сбрасываются при перезапуске сервера, что соответствует требованиям учебного задания).

## 🛠 Технологический стек

**Frontend:**
- React 18
- Vite
- CSS (кастомные стили)

**Backend:**
- Node.js
- Express.js
- `dotenv` (для управления переменными окружения)
- `cors` (для разрешения кросс-доменных запросов)

## 📂 Структура проекта

```text
todo-app/
├── todo-backend/          # Серверная часть
│   ├── .env               # Переменные окружения сервера
│   ├── package.json       # Зависимости бэкенда
│   └── server.js          # Точка входа и логика API
├── todo-frontend/         # Клиентская часть
│   ├── .env               # Переменные окружения клиента
│   ├── package.json       # Зависимости фронтенда
│   ├── index.html
│   └── src/
│       ├── App.jsx        # Основной компонент с логикой CRUD
│       ├── App.css        # Стили приложения
│       ├── main.jsx       # Точка входа React
│       └── components/    # Переиспользуемые компоненты
│           ├── TaskInput.jsx
│           ├── TaskList.jsx
│           └── TaskItem.jsx
└── README.md              # Этот файл
```

УСТАНОВКА:
git clone https://github.com/jgnom/todo-app.git
cd todo-app

# Переход в папку бэкенда
cd todo-backend

# Установка зависимостей
npm install

# Создание файла .env
```
PORT=4000
API_KEY=my-super-secret-key-123
```

# Переход в папку фронтенда
cd todo-frontend

# Установка зависимостей
npm install

# Создание файла .env
`VITE_API_KEY=my-super-secret-key-123`


ЗАПУСК:
backend:
```
cd todo-backend
node server.js
```
frontend:
```
cd todo-frontend
npm run dev
```