// App.js
import 'bootstrap/dist/css/bootstrap.min.css';
// App.js
import React, { useState } from 'react';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTask = () => {
    if (taskName.trim() === '') {
      alert('Task name cannot be empty');
      return;
    }

    setTasks([...tasks, { id: tasks.length + 1, text: taskName, description, status: 'notCompleted' }]);
    setTaskName('');
    setDescription('');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskStatus = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: task.status === 'notCompleted' ? 'completed' : 'notCompleted' } : task
      )
    );
  };

  const editTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const updateTask = (taskId, updatedText, updatedDescription) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: updatedText, description: updatedDescription } : task
      )
    );
    setEditingTaskId(null);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  const filterTasks = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="app-container">
      <h1 className="app-heading">My Todo</h1>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Todo</button>
      </div>
      <div className="filter-container">
        <h3>My Todo</h3>
        <div className="status-filter">
          <label>Filter:</label>
          <select value={filter} onChange={(e) => filterTasks(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="notCompleted">Not Completed</option>
          </select>
        </div>
      </div>
      <TodoList
        tasks={filteredTasks}
        onDelete={deleteTask}
        onToggle={toggleTaskStatus}
        onEdit={editTask}
        onUpdate={updateTask}
        onCancelEdit={cancelEdit}
        editingTaskId={editingTaskId}
      />
    </div>
  );
}

export default App;

