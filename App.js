import "./style.css";

export default function App() {
  return (
    <div className="app">
      <Header />
      <AddTodo />
      <TodoList />
      <Stats />
    </div>
  );
}

function Header() {
  return <h1>Todo App</h1>;
}

function AddTodo() {
  return (
    <div className="add-form">
      <h3>Add task</h3>
      <form>
        <input type="text" placeholder="Enter task..." />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

function TodoList() {
  return (
    <div className="list">
      <div className="actions">
        <select>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <ul>
        <TodoItem text="Learn React" done={false} />
        <TodoItem text="Build Todo App" done={true} />
        <TodoItem text="Practice State" done={false} />
      </ul>
    </div>
  );
}

function TodoItem({ text, done }) {
  return (
    <li>
      <input type="checkbox" defaultChecked={done} />
      <span style={{ textDecoration: done ? "line-through" : "none" }}>
        {text}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return <footer className="stats">1 / 3 tasks completed</footer>;
}
