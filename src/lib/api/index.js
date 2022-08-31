function createUser({ email, password, name, phone }) { 
  const body = {
    email,
    password,
    phone,
    name
  }

  const config = {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  return fetch('http://localhost:8000/users', config)
  .then(res => res.json())
}

function createTodo({ todo, userToken }) {
  const body = {
    todo: todo
  }
  
  const config = {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(body)
  }
  
  return fetch(`http://localhost:8000/todos`, config)
  .then((res) => res.json())
}

function fetchTodos(token) {
  const config = {
      method: 'GET', 
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }
  
  return fetch(`http://localhost:8000/todos`, config)
  .then((res) => res.json())
}

function signInUser({ email, password }) { 
  const body = {
    email, 
    password
  }
  
  const config = {
      method: 'POST', 
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
  }
  
  return fetch(`http://localhost:8000/auth/login`, config)
  .then((res) => res.json())
}

function updateTodo(todoId, todoChange, token) {
  const body = { ...todoChange }
  
  const config = {
      method: 'PATCH', 
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
  }
  
  return fetch(`http://localhost:8000/todos/${todoId}`, config)
  .then((res) => res.json())
}

function deleteTodo(todoId, token) { 
  const config = {
      method: 'DELETE', 
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }
  
  return fetch(`http://localhost:8000/todos/${todoId}`, config)
  .then((res) => res.json())
}

function refreshToken(token) { 
  const config = {
    'method': 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }

  return fetch(`http://localhost:8000/auth/refresh`, config).then(res => res.json());
}

const api = {
  users: {
    create: createUser,
    login: signInUser
  },
  todos: {
    create: createTodo,
    getAll: fetchTodos,
    update: updateTodo,
    delete: deleteTodo,
  }, 
  auth: {
    refresh: refreshToken
  }
}

export default api;
