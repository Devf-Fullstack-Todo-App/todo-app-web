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

const api = {
  users: {
    create: createUser
  },
  todos: {
    create: createTodo
  }
}

export default api;
