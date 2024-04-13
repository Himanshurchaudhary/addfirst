import "./App.css";
import logo from "./logo.png";
import CreateTodo from "./components/create-todo.component";
import TodosList from "./components/todos-list.component";
import EditTodo from "./components/edit-todo.component";

import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="" target="_blank">
          <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
        </a>
        <Link to="/" className="navbar-brand">
          MERN-Stack Todo App
        </Link>
        <div className="collpase nav-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="navbar-item">
              <Link to="/" className="nav-link">
                Todos
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/create" className="nav-link">
                Create Todo
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<TodosList />} />
        <Route path="/edit/:id" element={<EditTodo />} />
        <Route path="/create" element={<CreateTodo />} />
      </Routes>
    </div>
  );
}

export default App;
