const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

router.get("/", todoController.getTodos);

router.post("/add", todoController.addTodo);

router.put("/edit/:id", todoController.editTodo);

router.delete("/delete/:id", todoController.deleteTodo);

module.exports = router;
