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

  return (
    <div className="App">
      <header className="App-header">
        <div style={{
          backgroundColor: 'white',
          borderRadius: '5px',
        }}>
          <input 
            value={todo}
            type="text" 
            placeholder='Ingresa la tarea' 
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="button" onClick={handleSubmitTask}>Agregar tarea</button>
        </div>
      </header>
    </div>
  );
}

export default App;
