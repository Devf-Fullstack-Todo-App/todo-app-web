import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');

  const handleSubmitTask = () => {
    const body = {
      todo: todo
    }
  
    const config = {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
  
    fetch('http://localhost:8000/todos', config)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setTodo('');
        })
        .catch((err) => console.error(err));
  }

  console.log('Se renderiza')

  // 1. Obtener info del usuario 
  // 2. Registrar al usuario
  // 3. Recibir respuesta y guardar el token
  // 4. Utilizar ese token para crear una tarea de ese mismo usuario
  // 4.1 - Necesitamos un endpoint "limitado" para ese usuario

  return (
    <div className="App">
      <header className="App-header">
        <div className="SignUp">
          <form className="SignUp-form">
            <h1 className="SignUp-title">Registrate</h1>
            <input 
              className="SignUp-input"
              placeholder="Ingresa tu email"
              type="email" 
              onChange={() => console.log('on email change')} 
            />
            <input 
              className="SignUp-input"
              placeholder="Ingresa tu password"
              type="password" 
              onChange={() => console.log('on password change')} 
            />
            <input
              className="SignUp-input"
              placeholder="Ingresa tu nombre"
              type="name" 
              onChange={() => console.log('on name change')} 
            />
            <input
              className="SignUp-input"
              placeholder="Ingresa tu teléfono" 
              type="phone" 
              onChange={() => console.log('on phone change')} 
            />
            <button 
              className="SignUp-button"
              onClick={() => console.log('onRegister')}
            >Registrarse</button>
          </form>
          {/* <input 
            value={todo}
            type="text" 
            placeholder='Ingresa la tarea' 
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="button" onClick={handleSubmitTask}>Agregar tarea</button> */}
        </div>
      </header>
    </div>
  );
}

export default App;
