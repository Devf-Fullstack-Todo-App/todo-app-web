import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../lib/api';
import './SignUp.css';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loader, setLoader] = useState(false);

  
  const onRegisterHandler = () => {
    setLoader(true)
    if (!email || !password || !name || !phone) {
      setError({ message: 'Se necesitan todos campos'})
      setLoader(false)
    }

    api.users.create({ email, password, name, phone })
    .then(data => {
      setSuccess({ message: 'Usuario registrado con éxito' });
      setLoader(false);
      props.onSignUp(data);
    })
    .catch(err => {
      console.error(err)
      setLoader(false);
    })
  }

  return (
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
        >
        {loader ? 'Cargando...' : 'Registrarse'}</button>

        {error && <p className="SignUp-error">{error.message}</p>}
        {success && <p className="SignUp-success">{success.message}</p>}

        <Link to="/inicio" className='SignUp-Link'>Ya tienes cuenta? Inicia sesión</Link>
      </form>
    </div>
  )
}

export default SignUp;