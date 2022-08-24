import { useEffect, useState } from 'react';
import SignUp from './components/SignUp';
import CreateTodo from './components/CreateTodo';
import './App.css';
import api from './lib/api';
import Login from './components/Login';


function Todo (props) {
  return (
    <li>{props.children}</li>
  )
}

function TodoList({ todos }) {
    
  return (
    <div>
      <ul>
        {todos.map((todo) => <Todo key={todo.id}>{todo.todo}</Todo>)}
      </ul>
    </div>
  )
}

function App() {
  const [userData, setUserData] = useState(null)
  const [todos, setTodos] = useState([]);

  function fetchTodos() {
    api.todos.getAll(userData.token)
    .then(data => setTodos(data))
    .catch((err) => console.error(err))
  }

  useEffect(() => {
    if(userData?.token) {
      fetchTodos();
    }
  }, [userData])

  console.log('Se renderiza')

  // 1. Obtener info del usuario 
  // 2. Registrar al usuario
  // 3. Recibir respuesta y guardar el token
  // 4. Utilizar ese token para crear una tarea de ese mismo usuario
  // 4.1 - Necesitamos un endpoint "limitado" para ese usuario

  return (
    <div className="App">
      <header className="App-header">
      {!userData && <SignUp onSignUp={(data) => setUserData(data)}/>}
      {!userData && <Login onLogin={(data) => setUserData(data)}/>}
      {userData &&
        <CreateTodo
        token={userData.token}
        onCreateTodo={() => fetchTodos()}
        />}
      {userData && <TodoList todos={todos} />}
      </header>
    </div>
  );
}

export default App;
