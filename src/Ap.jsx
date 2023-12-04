import './App.css';

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ name: '', description: '', status: 'Not Completed' });
  const [filterStatus, setFilterStatus] = useState('All');

  const addTodo = () => {
    setTodos((prevTodos) => [...prevTodos, { ...newTodo }]);
    setNewTodo({ name: '', description: '', status: 'Not Completed' });
  };

  const editTodo = (index) => {
    setNewTodo({ ...todos[index] });
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const deleteTodo = (index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  const changeStatus = (index, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) =>
        i === index ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterStatus === 'All') {
      return true;
    } else {
      return todo.status === filterStatus;
    }
  });

  return (
    <div>
      {/* Heading */}
      <h1 style={{ textAlign: 'center' }}>My Todo</h1>

      {/* Add Todo Section */}
      <div>
        <input
          type="text"
          placeholder="Todo Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Todo Description"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {/* My Todo and Status Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
        <h3>My Todo</h3>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>

      {/* Todo Lists */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredTodos.map((todo, index) => (
          <div key={index} style={{ backgroundColor: 'green', padding: '10px', margin: '5px', minWidth: '200px' }}>
            <p>Name: {todo.name}</p>
            <p>Description: {todo.description}</p>
            <p>Status: {todo.status}</p>
            <button onClick={() => editTodo(index)}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
            <select value={todo.status} onChange={(e) => changeStatus(index, e.target.value)}>
              <option value="Completed">Completed</option>
              <option value="Not Completed">Not Completed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;