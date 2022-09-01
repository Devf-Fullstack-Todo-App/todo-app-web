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
  }
  if (action.type === 'EDIT_TODO') {
    // Proces para editar un todo
  }
  return state;
}

const nuevoStore = createStore(todos);

const unsubscribe = nuevoStore.subscribe(() => console.log('cambio el estado'))

console.log(nuevoStore.getState())

nuevoStore.dispatch({ type: 'ADD_TODO', todo: 'Aprender Redux' })
nuevoStore.dispatch({ type: 'ADD_TODO', todo: 'Aprender Context' })
nuevoStore.dispatch({ type: 'ADD_TODO', todo: 'Aprender Java' })

console.log(nuevoStore.getState())

unsubscribe();