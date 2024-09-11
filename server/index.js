const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todoroute = require("../server/routes/todoroute");
const cors = require("cors");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.urlencoded({ extended: false }));

const port = 5000;

app.use("/api/todos", todoroute);

mongoose
  .connect(
    "mongodb+srv://johnrich7198:YVCuMEeJmM6ifg2f@todobackend.hvc4u.mongodb.net/TodoBackend?retryWrites=true&w=majority&appName=TodoBackend"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log("Error connecting to database"));
