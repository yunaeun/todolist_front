"use client";
import React, { useState } from 'react';
import styles from './styles/Todo.module.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [updateLog, setUpdateLog] = useState([]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = { text: newTodo, completed: false, updatedAt: new Date().toLocaleString() };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      logUpdate('Todo list updated', newTodoItem.text);
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index
        ? { ...todo, completed: !todo.completed, updatedAt: new Date().toLocaleString() }
        : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = (index) => {
    const removedTodoText = todos[index].text;
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    logUpdate('Todo list updated', removedTodoText);
  };

  const logUpdate = (message, todoText) => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}. ${
      currentDate.getMonth() + 1
    }. ${currentDate.getDate()}. ${currentDate.toLocaleTimeString()}`;
    
    const logEntry = `Updated: ${formattedDate} - ${todoText}`;
    setUpdateLog((prevLog) => [logEntry, ...prevLog]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.todoSection}>
        <h1 className={styles.header}>Todo List</h1>
        <div className={styles.addTodo}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul className={styles.todoList}>
          {todos.map((todo, index) => (
            <li key={index} className={`${styles.todoItem} ${todo.completed ? styles.completedTodo : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
              />
              <span>{todo.text}</span>
              <span className={styles.log}>
                <span className={styles.updatedAt}>Updated: {todo.updatedAt}</span>
                {todo.completed && <span className={styles.completedText}>Completed</span>}
              </span>
              <button className={styles.removeButton} onClick={() => removeTodo(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.logSection}>
        <h2 className={styles.logHeader}>Update Log</h2>
        <ul className={styles.logList}>
          {updateLog.map((log, index) => (
            <li key={index} className={`${styles.logItem} ${styles.todoItem}`}>
              {log}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
