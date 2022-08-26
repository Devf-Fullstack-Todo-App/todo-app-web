import React from 'react';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import './App.css';

import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import TodoList from './components/TodoList';

import useAuth from './lib/hooks/useAuth';

function App() {
  const [token, setToken] = useAuth();
  let navigate = useNavigate();

  function navigateToList(data) {
    setToken(data.token)
    navigate('/todos')
  }
  console.log('Se renderiza')

  // 1. Obtener info del usuario 
  // 2. Registrar al usuario
  // 3. Recibir respuesta y guardar el token
  // 4. Utilizar ese token para crear una tarea de ese mismo usuario
  // 4.1 - Necesitamos un endpoint "limitado" para ese usuario

  return (
    <div className="App">
      {token && <Navbar onCloseSession={() => setToken(null)} />}
      <header className="App-header">
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/registro" element={<SignUp onSignUp={navigateToList} />} />
          <Route path="/inicio" element={<SignIn onSignIn={navigateToList}/>} />
          <Route path="/todos" element={ token ? (
              <TodoList token={token} />
            ) : (
              <Navigate to="/inicio" replace />
            )
          } />
        </Routes>
      </header>
    </div>
  );
}

export default App;
