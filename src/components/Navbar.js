import React from 'react';
import './Navbar.css';

function Navbar(props) {
  return (
    <section className="Navbar">
      <div className="Navbar__container">
        <button onClick={props.onCloseSession}>Cerrar sesión</button>
      </div>
    </section>
  )
}

export default Navbar;