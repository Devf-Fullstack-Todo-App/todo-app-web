import React, { useState, useRef, useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import './Todo.css';

function useOutsideAlerter(ref, isEditing, callback) {
  useEffect(() => {
    if (!isEditing) return;

    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [ref, isEditing, callback])
}

function Todo(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoText, setTodoText] = useState(props.children);
  const todoRef = useRef(null);

  function onSave() {
    setIsEditing(false)
    props.onSaveChange(todoText);
  }
  useOutsideAlerter(todoRef, isEditing, () => onSave());

  function onEnterHandler(key) {
    if (key.code === "Enter") {
      onSave();
    }
  }

  function handleEditFocus() {
    if (todoRef.current) {
      // TODO: Lograr poner el cursor en el input
      // todoRef.current.focus();
    }
  }

  return (
    <li
      ref={todoRef}
      className={`Todo ${props.completed ? 'Todo--completed' : ''}`}
    >
      { isEditing && (
        <input 
          className='Todo__edit-input'
          onKeyDown={onEnterHandler}
          type="text" 
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        /> 
      )}
      { !isEditing && (
          <span className="Todo__text" onClick={props.onToggle}>
            {todoText}
          </span>
      )}
    
      <button 
        type="button" 
        className="Todo__edit-btn btn btn-warning"
        onClick={() => {
          if (isEditing) {
            onSave()
          } else { 
            setIsEditing(true);
            handleEditFocus();
          }
        }}
      >{isEditing ? <Icon.Save />: <Icon.PencilFill />}</button>
      <button 
        className="Todo__delete-btn btn btn-danger" 
        onClick={props.onDelete}
      ><Icon.TrashFill /></button>
    </li>
  )
}

export default Todo;
