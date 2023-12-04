// TodoList.js
import React from 'react';
import './TodoList.css';

const TodoList = ({ tasks, onDelete, onToggle, onEdit, onUpdate, onCancelEdit, editingTaskId }) => {
  return (
    <div className="todo-list-container">
      {tasks.map((task) => (
        <div className="todo-card" key={task.id}>
          <div className="task-details">
            <h4>{task.text}</h4>
            <p>{task.description}</p>
            {editingTaskId === task.id ? (
              <div>
                <div className="status-dropdown">
                  <select
                    value={task.status}
                    onChange={(e) => onUpdate(task.id, task.text, task.description, e.target.value)}
                  >
                    <option value="not_completed">Not Completed</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="edit-delete-buttons">
                  <button onClick={() => onUpdate(task.id, task.text, task.description, task.status)}>
                    Update
                  </button>
                  <button onClick={onCancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <div
                  className="status-dropdown"
                  style={{ backgroundColor: task.status === 'completed' ? 'green' : 'red' }}
                  onClick={() => onToggle(task.id)}
                >
                  {task.status === 'completed' ? 'Completed' : 'Not Completed'}
                </div>
                <div className="edit-delete-buttons">
                  <button onClick={() => onEdit(task.id)}>Edit</button>
                  <button onClick={() => onDelete(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
