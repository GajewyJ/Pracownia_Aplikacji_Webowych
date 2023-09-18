const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {
    res.statusCode = 200
    const prompt1 = require("prompt-sync")({ sigint: true })
    const a = prompt1("Podaj liczbę 1: ")
    const prompt2 = require("prompt-sync")({ sigint: true })
    const b = prompt2("Podaj liczbę 2: ")
    const result1 = Number(a) + Number(b)
    res.setHeader('content-type', 'text/plain')
    res.end(`Wynik: ${String(result1)}`)
    process.exit(1);
})

server.listen(port, hostname, () => {
    console.log("Server is running");
})