import React, { useState, useEffect } from 'react';
import './TodoList.css';

import api from '../lib/api';

import Todo from './Todo';
import CreateTodo from './CreateTodo';

function TodoList({ token }) {
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    api.todos.getAll(token)
    .then(data => setTodos(data))
    .catch((err) => console.error(err)) // TODO: manejar error correctamente
  }

  function toggleTodo(todoId, todoCompleted) { 
    api.todos.update(todoId, {
      completed: todoCompleted
    }, token)
    .then(() => fetchTodos())
    .catch((err) => console.error(err)) // TODO: manejar error correctamente
  }

  function deleteTodo(todoId) {
    api.todos.delete(todoId, token)
      .then(() => fetchTodos())
      .catch((err) => console.error(err)) // TODO: manejar error correctamente
  }

  function editTodo(todoId, newTodoText) {
    api.todos.update(todoId, {
      todo: newTodoText
    }, token)
    .then(() => fetchTodos())
    .catch((err) => console.error(err)) // TODO: manejar error correctamente
  }

  useEffect(() => {
    if(token) {
      fetchTodos();
    }
  }, [token])

  return (
    <>
      <CreateTodo 
        token={token}
        onCreateTodo={() => fetchTodos()}
      />
      <div className="TodoList">
        <ul className="TodoList__container">
          {todos.map((todo) => (
              <Todo 
                key={todo.id} 
                onToggle={() => toggleTodo(todo.id, !todo.completed)}
                onDelete={() => deleteTodo(todo.id)}
                completed={todo.completed}
                onSaveChange={(change) => {
                  if (change !== todo.todo) {
                    editTodo(todo.id, change)
                  }
                }}
              >
                {todo.todo}
              </Todo>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default TodoList;
