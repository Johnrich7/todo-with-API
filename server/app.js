const http = require('http');
const url = require('url')

let todos = []

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const path = parsedUrl.pathname
    const method = req.method

    res.setHeader("Content-Type", "application/json")

    if (method === "GET" && path === "/api/todos") {
        res.statusCode = 200;
        res.end(JSON.stringify({ todos }))
    } else if (method === "POST" && path === "/api/todos") {
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const { name, input } = JSON.parse(body)
            const newTodo = { id: todos.length + 1, name, input }
            todos.push(newTodo)
            res.statusCode = 201
            res.end(JSON.stringify({ message: 'Todo added', todo: newTodo }))
        })
    } else if (method === "PUT" && path.startsWith === "/api/todos") {
        const id = parseInt(path.split('/')[3])
        let body = ''
        req.on('data', chunk => {
            body += chunk.toString();
        })
        req.on('end', () => {
            const { name, input } = JSON.parse(body)
            const todoIndex = todos.findIndex(todo => todo.id === id)
            if (todoIndex === -1) {
                res.statusCode = 404;
                res.end(JSON.stringify({ message: 'Todo not found' }))
            } else {
                todos[todoIndex].name = name || todos[todoIndex].name
                todos[todoIndex].input = input || todos[todoIndex].input
                res.statusCode = 200
                res.end(JSON.stringify({ message: 'Todo updated' }))
            }
        })
    } else if (method === "DELETE" && path.startsWith("/api/todos/")) {
        const id = parseInt(path.split('/')[3])
        const todoIndex = todos.findIndex(todo => todo.id === id)
        if (todoIndex === -1) {
            res.statusCode = 404
            res.end(JSON.stringify({message: 'Todo not found'}))
        } else {
            todos.splice(todoIndex, 1)
            res.statusCode = 200
            res.end(JSON.stringify({message: 'Todo deleted'}))
        }
    } else {
        res.statusCode = 404
        res.end(JSON.stringify({message: 'not found'}))
    }
})

const port = 5000
server.listen(port, () => console.log(`Server started on port ${port}`))


// {id: 1, name: "John", input: 'complete task'},
// {id: 2, name: "Kyle", input: 'Play'},
// {id: 3, name: "Sally", input: 'finish the assignment'},
// {id: 4, name: "Kevin", input: 'Eat'},
// {id: 5, name: "Joe", input: 'Go for walk'},
// {id: 6, name: "Tylor", input: 'call mom'},
// {id: 7, name: "Mark", input: 'shopping'}