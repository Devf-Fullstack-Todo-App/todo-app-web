import { useState } from 'react';
import './App.css';
import SignUp from './components/SignUp';

function App() {
  const [todo, setTodo] = useState('')
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
        <SignUp />


      </header>
    </div>
  );
}

export default App;
