const express = require("express");
const fs = require("fs");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

const port = 3000;
const dataFilePath = "./data.json";

const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading the file:", error);
    return [];
  }
};

const writeDataFile = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(data);
  } catch (error) {
    console.error("Error writing the file:", error);
  }
};

app.get("/todos", (req, res) => {
  const todos = readDataFromFile();
  res.json(todos);
  // console.log(todos)
});

app.post("/add-todos", (req, res) => {
  const todos = readDataFromFile();
  const newTodo = {
    id: uuidv4(),
    name: req.body.name,
    input: req.body.input,
  };
  todos.push(newTodo);
  writeDataFile(todos);
  console.log("Todo added successfully");
  res.status(201).json({ message: "Todo added successfully" });
});

app.put("/edit-todos/:id", (req, res) => {
  let todos = readDataFromFile();
  const id = req.params.id;
  const updatedTodo = todos.map((todo) =>
    todo.id === id
      ? { ...todo, name: req.body.name, input: req.body.input }
      : todo
  );
  writeDataFile(updatedTodo);
  res.status(200).json({ message: "Todo updated successfully" });
});

app.delete("/delete-todos/:id", (req, res) => {
  const id = req.params.id;
  let todos = readDataFromFile();
  const fileteredTodo = todos.filter((todo) => todo.id !== id);
  writeDataFile(fileteredTodo);
  res.status(200).json({ message: "Todo deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`);
});
