const http = require('http')

const host = '127.0.0.1'
const port = 3000

const srv = http.createServer((req, res)=>{
    res.statusCode = 200
    res.setHeader('content-type','text/plain')
    res.write('Hello world')
    res.end()
})

srv.listen(port, host, ()=>{
    console.log(`Server running at ${host}:${port}`)
})