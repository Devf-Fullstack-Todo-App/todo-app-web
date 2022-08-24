import React, { useState } from 'react';

import api from '../lib/api';

function CreateTodo(props) { 
  const [todo, setTodo] = useState('');

  const handleSubmitTask = () => {
    api.todos.create({ 
      todo, 
      userToken: props.token, 
      userId: props.userId 
    }).then((data) => {
        console.log(data);
      setTodo('');
      props.onCreateTodo()
    })
    .catch((err) => console.error(err));
}
  return (
    <div>
      <form>
        <input 
            value={todo}
            type="text" 
            placeholder='Ingresa la tarea' 
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="button" onClick={handleSubmitTask}>Agregar tarea</button>
      </form>
    </div>
  )
}

export default CreateTodo;
