import React, { useState } from 'react';
import './CreateTodo.css';

import api from '../lib/api';

function CreateTodo(props) { 
  const [todo, setTodo] = useState('');

  const handleSubmitTask = () => {
    if (!todo) return;
    api.todos.create({ 
      todo, 
      userToken: props.token, 
      userId: props.userId 
    }).then((data) => {
      setTodo('');
      props.onCreateTodo()
    })
    .catch((err) => console.error(err));
  }

  function onEnterHandler(key) {
    if (key.code === "Enter") {
      handleSubmitTask();
    }
  }

  return (
    <div className="CreateTodo">
      <form 
        className="input-group mb-3 w-100"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={onEnterHandler}
          className="form-control"
          type="text"  placeholder="Que tienes pendiente?" 
          aria-label="Tarea a crear" 
          aria-describedby="crear-tarea"
        />
      <button 
        className="CreateTodo__btn btn btn-outline-secondary" 
        type="button" 
        id="crear-tarea"
        onClick={handleSubmitTask}
      >Agregar</button>
      </form>
    </div>
  )
}

export default CreateTodo;
