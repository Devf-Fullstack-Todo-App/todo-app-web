import React from 'react';
import './Navbar.css';

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../lib/state/slices'

function Navbar(props) {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <section className="Navbar">
      <div className="Navbar__container">
        <button onClick={props.onCloseSession}>Cerrar sesión</button>
      </div>
      <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
    </section>
  )
}

export default Navbar;