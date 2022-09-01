import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices';

// Action Types
export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';

const ADD_GOAL = 'ADD_GOAL';
const REMOVE_GOAL = 'REMOVE_GOAL';

// Reducer
function todos(state = [], action) {
  if (action.type === ADD_TODO) {
    // Proceso para regresar el estado con ese todo nuevo
    return state.concat([action.todo])
  }
  if (action.type === DELETE_TODO) {
    // Proceso para eliminar el todo
    return state.filter(todo => todo.id !== action.todo_id)
  }
  if (action.type === EDIT_TODO) {
    // Proceso para editar un todo
  }
  if (action.type === TOGGLE_TODO) {
    return state.map((todo) => todo.id !== action.todo_id ? todo : 
    { ...todo, completed: !todo.completed })
  }
  return state;
}

function goals(state = [], action) {
  switch(action.type) {
    case ADD_GOAL: 
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.goal_id)
    default: return state;
  }
}

function rootReducer(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = configureStore({
  reducer: {
    ...rootReducer,
    counter: counterReducer
  }
})

export default store;
