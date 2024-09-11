const Todo = require("../models/data.model");
const dayjs = require("dayjs");

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    const formattedTodos = todos.map((todo) => ({
      ...todo._doc,
      createdAt: dayjs(todo.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: dayjs(todo.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    }));

    res.status(200).json(formattedTodos);
  } catch (error) {
    res.status(500).json({ message: "not found" });
  }
};

exports.addTodo = async (req, res) => {
  const { name, input } = req.body;
  const newTodo = new Todo({
    name,
    input,
  });
  try {
    const savedTodo = await newTodo.save();
    const formattedTodos = {
      ...savedTodo._doc,
      createdAt: dayjs(savedTodo.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: dayjs(savedTodo.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    };

    res.status(201).json({ message: "Todo added", todo: formattedTodos });
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
};

exports.editTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, input } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { name, input },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    const formattedTodos = {
      ...updatedTodo._doc,
      createdAt: dayjs(updatedTodo.createdAt).format("YYYY-MM-DD HH-mm-ss"),
      updatedAt: dayjs(updatedTodo.updatedAt).format("YYYY-MM-DD HH-mm-ss"),
    };
    res.status(200).json({ message: "Todo updated", todo: formattedTodos });
  } catch (error) {
    res.status(400).json({ message: "not found" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id);
    if (!deleteTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo delete" });
  } catch (error) {
    res.status(400).json({ message: "not found" });
  }
};
