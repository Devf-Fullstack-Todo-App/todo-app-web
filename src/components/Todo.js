import React from 'react';
import './Todo.css';

function Todo(props) {
  return (
    <li onClick={props.onToggle} className={`Todo ${props.completed ? 'Todo--completed' : ''}`}>
      {props.children}
    </li>
  )
}

export default Todo;
