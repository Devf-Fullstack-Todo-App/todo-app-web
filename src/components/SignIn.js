import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../lib/api';
import './SignIn.css';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loader, setLoader] = useState(false);

  
  const onRegisterHandler = () => {
    setLoader(true)
    if (!email || !password) {
      setError({ message: 'Se necesitan todos campos'})
      setLoader(false)
    }

    api.users.login({ email, password})
    .then(data => {
      console.log(data);
      setSuccess({ message: 'Usuario inició sesión con éxito' });
      setLoader(false);
      props.onSignIn(data);
    })
    .catch(err => {
      console.error(err)
      setLoader(false);
    })
  }

  return (
    <div className="SignIn">
      <form className="SignIn-form">
        <h1 className="SignIn-title">Inicia sesión</h1>
        <input 
          className="SignIn-input"
          placeholder="Ingresa tu email"
          type="email" 
          onChange={(e) => {
            setError(null)
            setEmail(e.target.value)
          }} 
        />
        <input 
          className="SignIn-input"
          placeholder="Ingresa tu password"
          type="password" 
          onChange={(e) => {
            setError(null)
            setPassword(e.target.value)
          }} 
        />
        <button
          type="button"
          className="SignIn-button"
          onClick={onRegisterHandler}
        >
        {loader ? 'Cargando...' : 'Iniciar sesión'}</button>
        {error && <p className="SignIn-error">{error.message}</p>}
        {success && <p className="SignIn-success">{success.message}</p>}
        <Link to="/registro">No tienes cuenta? Registrate</Link>
      </form>
    </div>
  )
}

export default SignIn;