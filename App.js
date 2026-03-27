import React from "react";
import "./style.css";

export default function App() {
  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("");
  const [filter, setFilter] = React.useState("all");

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setTodos((prev) => [...prev, { id: Date.now(), text: input, done: false }]);

    setInput("");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  // ✅ Derived state (filtering)
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  // ✅ Derived stats
  const total = todos.length;
  const completed = todos.filter((t) => t.done).length;

  return (
    <div className="app">
      <Header />

      <AddTodo input={input} setInput={setInput} onAdd={addTodo} />

      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        filter={filter}
        setFilter={setFilter}
      />

      <Stats total={total} completed={completed} />
    </div>
  );
}

function Header() {
  return <h1>Todo App</h1>;
}

function AddTodo({ input, setInput, onAdd }) {
  return (
    <div className="add-form">
      <h3>Add task</h3>
      <form onSubmit={onAdd}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}

function TodoList({ todos, onDelete, onToggle, filter, setFilter }) {
  return (
    <div className="list">
      <div className="actions">
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
        {todo.text}
      </span>

      <button onClick={() => onDelete(todo.id)}>❌</button>
    </li>
  );
}

function Stats({ total, completed }) {
  return (
    <footer className="stats">
      {completed} / {total} tasks completed
    </footer>
  );
}
