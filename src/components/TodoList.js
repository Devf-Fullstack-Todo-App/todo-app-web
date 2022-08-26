import React, { useState, useEffect } from 'react';

import api from '../lib/api';

import Todo from './Todo';
import CreateTodo from './CreateTodo';

function TodoList({ token }) {
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    api.todos.getAll(token)
    .then(data => setTodos(data))
    .catch((err) => console.error(err))
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
      <div>
        <ul>
          {todos.map((todo) => <Todo key={todo.id}>{todo.todo}</Todo>)}
        </ul>
      </div>
    </>
  )
}

export default TodoList;
