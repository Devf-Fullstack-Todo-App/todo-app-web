import { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loader, setLoader] = useState(false)

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

  const onRegisterHandler = () => {
    setLoader(true)
    console.log({ 
      email,
      password,
      name,
      phone
    })
    if (!email || !password || !name || !phone) {
      setError({ message: 'Se necesitan todos campos'})
      setLoader(false)
    }

    setTimeout(() => {
      setSuccess({ message: 'Usuario registrado con éxito' });
      setLoader(false)
    }, 3000) 
  }

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
              onChange={(e) => {
                setError(null)
                setEmail(e.target.value)
              }} 
            />
            <input 
              className="SignUp-input"
              placeholder="Ingresa tu password"
              type="password" 
              onChange={(e) => {
                setError(null)
                setPassword(e.target.value)
              }} 
            />
            <input
              className="SignUp-input"
              placeholder="Ingresa tu nombre"
              type="name" 
              onChange={(e) => {
                setError(null)
                setName(e.target.value)
              }} 
            />
            <input
              className="SignUp-input"
              placeholder="Ingresa tu teléfono" 
              type="phone" 
              onChange={(e) => {
                setError(null)
                setPhone(e.target.value)
              }} 
            />
            <button
              type="button"
              className="SignUp-button"
              onClick={onRegisterHandler}
            >{loader ? 'Cargando...' : 'Registrarse'}</button>
            {error && <p className="SignUp-error">{error.message}</p>}
            {success && <p className="SignUp-success">{success.message}</p>}
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
