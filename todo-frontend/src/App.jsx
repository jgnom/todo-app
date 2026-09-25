import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

const API_URL = 'http://localhost:4000/api/tasks';
const API_KEY = import.meta.env.VITE_API_KEY || 'my-super-secret-key-123';

// Вспомогательная функция для заголовков
const getHeaders = (isJson = false) => {
  const headers = { 'x-api-key': API_KEY };
  if (isJson) headers['Content-Type'] = 'application/json';
  return headers;
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Загрузка задач при монтировании компонента
  useEffect(() => {
    fetch(API_URL, {
      headers: getHeaders()
    })
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка авторизации или сервера');
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error('Ошибка загрузки задач:', err));
  }, []);

  // POST — добавление задачи
  const handleAddTask = async () => {
    if (!inputValue.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ text: inputValue })
      });
      if (res.ok) {
        const newTask = await res.json();
        setTasks([...tasks, newTask]);
        setInputValue('');
      } else {
        console.error('Ошибка при добавлении задачи');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
    }
  };

  // DELETE — удаление задачи
  const handleDeleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      if (res.ok) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    }
  };

  // PUT — обновление задачи
  const handleUpdateTask = async (id, newText) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ text: newText })
      });
      if (res.ok) {
        const updatedTask = await res.json();
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      }
    } catch (error) {
      console.error('Ошибка при обновлении:', error);
    }
  };

  return (
    <div className="App">
      <h1>Мой список дел</h1>
      <TaskInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onUpdateTask={handleUpdateTask}
      />
      <p>Задач: {tasks.length}</p>
    </div>
  );
}

export default App;