async function createUser({ email, password, phone, name }) {
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

function loginUser({ email, password, userToken }) {
  const body = {
    email,
    password
  }

  const config = {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify(body)
  }

  return fetch('http://localhost:8000/auth/login', config)
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
  .then(res => res.json())
}

function fetchTodos(token) {
  const config = {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${token}`
      }
  }
  return fetch('http://localhost:8000/todos', config)
  .then(res => res.json());
}

const api = {
  users: {
    create: createUser
  },
  auth: {
    login: loginUser
  },
  todos: {
    create: createTodo,
    getAll: fetchTodos,
  }
}

export default api;