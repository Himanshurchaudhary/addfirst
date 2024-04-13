import { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Todo extends Component {
  render() {
    return (
      <tr>
        <td className={this.props.todo.isCompleted ? "completed" : ""}>
          {" "}
          {this.props.todo.description}{" "}
        </td>
        <td className={this.props.todo.isCompleted ? "completed" : ""}>
          {" "}
          {this.props.todo.responsible}{" "}
        </td>
        <td className={this.props.todo.isCompleted ? "completed" : ""}>
          {" "}
          {this.props.todo.priority}{" "}
        </td>
        <td>
          <Link to={"/edit/" + this.props.todo._id}>Edit</Link>
          <Link
            style={{ marginLeft: "10px" }}
            to="/"
            onClick={() =>
              axios
                .delete(`http://localhost:3000/todos/${this.props.todo._id}`)
                .then(() => window.location.reload())
            }
          >
            Delete
          </Link>
        </td>
      </tr>
    );
  }
}

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  todoList() {
    return this.state.todos.map(function (currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody> {this.todoList()} </tbody>
        </table>
      </div>
    );
  }
}
