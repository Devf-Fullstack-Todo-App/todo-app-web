import React, { useState } from 'react'
import api from '../lib/api';
import './Login.css'

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loader, setLoader] = useState(null);
  
  const onLoginHandler = () => {
    setLoader(true)
    console.log({
      email,
      password,
    })
    if (!email || !password) {
      setError({ message: 'Se necesitan todos los campos' })
      setLoader(false)
    }

    api.auth.login({ email, password })
    .then(data => {
      console.log(data)
      setSuccess({ message: 'Login realizado con exito' });
      setLoader(false);
      props.onLogin(data);
    })
    .catch(err => {
      console.error(err)
      setLoader(false)
    })

  }

  return (
    <div className="Login">

    <form className="Login-form">

      <h1 className="Login-title">Iniciar Sesion</h1>

      <input 
        className="Login-input"
        placeholder="Ingresa tu email"
        type="email" 
        onChange={(e) => {
          setError(null)
          setEmail(e.target.value)
        }} 
      />

      <input 
        className="Login-input"
        placeholder="Ingresa tu password"
        type="password" 
        onChange={(e) => {
          setError(null)
          setPassword(e.target.value)
        }} 
      />

      <button
        type="button"
        className="Login-button"
        onClick={onLoginHandler}
      >
        {loader ? 'Cargando...' : 'Iniciar Sesion'}
      </button>

      {error && <p className="Login-error">{error.message}</p>}
      {success && <p className="Login-success">{success.message}</p>}

      </form>
    </div>
  )
}

export default Login;