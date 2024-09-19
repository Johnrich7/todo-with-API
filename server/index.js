const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todoroute = require("../server/routes/todoroute");
const cors = require("cors");
const dotenv = require("dotenv");
const {PORT, MONGODB_URL} = require("../server/.secrets/env")

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.urlencoded({ extended: false }));


app.use("/api/todos", todoroute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch(() => console.log("Error connecting to database"));
