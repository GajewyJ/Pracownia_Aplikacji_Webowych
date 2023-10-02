import http from 'http'
import {readFile, writeFile} from 'fs/promises'

const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer(async (req, res) => {
    res.statusCode = 200
    const url = req.url
    const method = req.method
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
    else if(url==='/api'){
        const json = {
            'Cars' : [
            { 'Brand' : 'Volvo' , 'Model' : '240', 'Year' : 1990 },
            { 'Brand' : 'Ferrari' , 'Model' : 'F40', 'Year' : 1988 },
            { 'Brand' : 'Jaguar' , 'Model' : 'E-Type', 'Year' : 1970 }
            ]
        }

        res.setHeader('content-type', 'application/json')
        res.write(JSON.stringify(json))
        res.end()
    }
    else if(url==='/kontakt' && method==='POST'){
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk.toString())
            body.push(chunk)
        })
        req.on('end', async ()=> {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            await writeFile(`contact/message-${Date.now().toString()}.txt`, `${message}`);
            res.statusCode = 302
            res.setHeader('Location', '/dziekujemy')
            return res.end()
        })
    }
    else{
        const json = {
            Error:'404'
        }

        res.setHeader('content-type', 'application/json')
        res.write(JSON.stringify(json))
        res.end()
    }
    
})

server.listen(port, hostname, () => {
    console.log(`Server running at ${hostname}:${port}`)
})