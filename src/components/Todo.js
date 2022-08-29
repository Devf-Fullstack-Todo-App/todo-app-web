import React from 'react';
import './Todo.css';

function Todo(props) {
  return (
    <li
    className={`Todo ${props.completed ? 'Todo--completed' : ''}`}
    >

      <span
      className='Todo__text'
      onClick={props.onToggle}
      >
        {props.children}
      </span>

      <button
        className="Todo__edit-btn"
        type="button"
        onClick={props.editTodo}
        id="button-addon2"
      >
        Editar
      </button>

      <button
      className="Todo__delete-btn"
      onClick={props.onDelete}
      >
        X
      </button>

    </li>
  )
}

export default Todo;