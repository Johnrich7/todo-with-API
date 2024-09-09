const http = require("http");
const url = require("url");
// const cors = require('cors')

let todos = [];
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");

  if (method == "OPTIONS") {
    res.setHeader(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    res.end("ok");
    return;
  }

  //GET METHOD
  if (method === "GET" && path === "/api/todos") {
    res.statusCode = 200;
    res.end(JSON.stringify({ todos }));
  } else if (method === "POST" && path === "/api/todos") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString(); //Incoming data from the client on body
    });
    req.on("end", () => {
      const { name, input } = JSON.parse(body);
      const newTodo = { id: todos.length + 1, name, input };
      todos.push(newTodo);
      res.statusCode = 201;
      res.end(JSON.stringify({ message: "Todo added", Todo: newTodo })); // sending response to client
    });
  } else if (method === "PUT" && path.startsWith === "/api/todos") {
    const id = parseInt(url.split("/")[3]);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { name, input } = JSON.parse(body);
      const todoIndex = todos.findIndex((todo) => todo.id === id);
      if (todoIndex === -1) {
        res.statusCode = 404;
        res.end(JSON.stringify({ message: "Todo not found" }));
      } else {
        todos[todoIndex].name = name || todos[todoIndex].name;
        todos[todoIndex].input = input || todos[todoIndex].input;
        res.statusCode = 200;
        res.end(
          JSON.stringify({ message: "Todo Updated", todo: todos[todoIndex] })
        );
      }
    });
  } else if (method === "DELETE" && path.startsWith === "/api/todos") {
    const id = parseInt(url.split("/")[3]);
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: "Todo not found" }));
    } else {
      todos.splice(todoIndex, 1); //Remove todo from array
      res.statusCode = 200;
      res.end(JSON.stringify({ message: "Todo deleted" }));
    }
  } else {
    res.statusCode = 404;
    res.end(JSON.stringify({ message: "not found" }));
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// server.use(cors());
