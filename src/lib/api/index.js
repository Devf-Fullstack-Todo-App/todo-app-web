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

const api = {
  users: {
    create: createUser
  }
}

export default api;
