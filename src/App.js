import { useState } from 'react';
import SignUp from './components/SignUp';
import CreateTodo from './components/CreateTodo';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null)

  console.log('Se renderiza')

  // 1. Obtener info del usuario 
  // 2. Registrar al usuario
  // 3. Recibir respuesta y guardar el token
  // 4. Utilizar ese token para crear una tarea de ese mismo usuario
  // 4.1 - Necesitamos un endpoint "limitado" para ese usuario

  return (
    <div className="App">
      <header className="App-header">
      {!userData && <SignUp onSignUp={(data) => setUserData(data)}/>}
      {userData && <CreateTodo token={userData.token} userId={userData.user.id} />}
      </header>
    </div>
  );
}

export default App;
