const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;

let todos = [];

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/api/todos", (req, res) => {
  res.status(200).json(todos);
});

app.post("/api/todos", (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    name: req.body.name,
    input: req.body.input,
  };
  todos.push(newTodo);
  res.status(201).json({ message: "Todo added", todo: newTodo });
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { name, input } = req.body;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).json({ message: "Not found" });
  }
  todos[todoIndex].name = name || todos[todoIndex].name;
  todos[todoIndex].input = input || todos[todoIndex].input;
  res.status(200).json({
    message: "Todo updated",
    todo: todos[todoIndex],
  });
});

app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex === -1) {
    res.status(404).json({ message: "Not found" });
  }
  todos.splice(todoIndex, 1);
  res.status(200).json({ message: "Todo deleted" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
