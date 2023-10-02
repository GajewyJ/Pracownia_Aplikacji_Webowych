import http from 'http'
import {readFile} from 'fs/promises'

const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer(async (req, res) => {
    res.statusCode = 200
    const url = req.url
    if(url==='/'){
        const html = await readFile('./index.html')

        res.setHeader('Content-Type', 'text/html')
        res.write(html)
        res.end()
    }
    else if(url==='/dziekujemy'){
        const html = await readFile('./dziekujemy.html')

        res.setHeader('Content-Type', 'text/html')
        res.write(html)
        res.end()
    }
    else if(url=="api"){
        const html = await readFile('./dziekujemy.html')

        res.setHeader('Content-Type', 'text/html')
        res.write(html)
        res.end()
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
})