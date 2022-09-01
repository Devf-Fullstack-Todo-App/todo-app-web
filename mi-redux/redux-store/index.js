// Store
function createStore(reducer) {
  // El store debería tener 4 partes
  // 1. El estado ✅
  // 2. Manera de obtener el estado ✅
  // 3. Manera de escuchar cambios en ese estado
  // 4. Actualizar el estado

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => listener())
  }

  const store = {
    getState,
    subscribe,
    dispatch
  }

  return store;
}

// Reducer
function todos(state = [], action) {
  if (action.type === 'ADD_TODO') {
    // Proceso para regresar el estado con ese todo nuevo
    return state.concat([action.todo])
  }
  if (action.type === 'DELETE_TODO') {
    // Proceso para eliminar el todo
    return state.filter(todo => todo.id !== action.todo_id)
  }
  if (action.type === 'EDIT_TODO') {
    // Proceso para editar un todo
  }
  if (action.type === 'TOGGLE_TODO') {
    return state.map((todo) => todo.id !== action.todo_id ? todo : 
    { ...todo, completed: !todo.completed })
  }
  return state;
}

function goals(state = [], action) {
  switch(action.type) {
    case 'ADD_GOAL': 
      return state.concat([action.goal])
    case 'REMOVE_GOAL':
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

const nuevoStore = createStore(rootReducer);

const unsubscribe = nuevoStore.subscribe(() => console.log('cambio el estado'))
unsubscribe();
const unsubscribeLogger = nuevoStore.subscribe(() => {
  console.log('El nuevo estado es:')
  console.log(nuevoStore.getState())
})

nuevoStore.dispatch({ 
    type: 'ADD_TODO', 
    todo: {
      id: 0,
      name: 'Aprender Redux',
      completed: false
    } 
})

nuevoStore.dispatch({ 
  type: 'ADD_TODO', 
  todo: {
    id: 1,
    name: 'Aprender Express.js',
    completed: false
  } 
})

nuevoStore.dispatch({ 
  type: 'ADD_TODO', 
  todo: {
    id: 2,
    name: 'Aprender Java',
    completed: false
  } 
})

nuevoStore.dispatch({
  type: 'DELETE_TODO',
  todo_id: 1
})

nuevoStore.dispatch({
  type: 'TOGGLE_TODO',
  todo_id: 2
})

nuevoStore.dispatch({
  type: 'TOGGLE_TODO',
  todo_id: 0
})

nuevoStore.dispatch({ 
  type: 'ADD_GOAL', 
  goal: {
    id: 0,
    name: 'Obtener mi primer trabajo como developer'
  }
})

nuevoStore.dispatch({ 
  type: 'ADD_GOAL', 
  goal: {
    id: 1,
    name: 'Llegar a mi peso ideal'
  }
})

nuevoStore.dispatch({ 
  type: 'REMOVE_GOAL', 
  goal_id: 1
})
