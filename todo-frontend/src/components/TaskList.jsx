import TaskItem from './TaskItem';

export default function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
  if (tasks.length === 0) {
    return <p className="empty-list">Список задач пуст</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDeleteTask}
          onUpdate={onUpdateTask}
        />
      ))}
    </ul>
  );
}