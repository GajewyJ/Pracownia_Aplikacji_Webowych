import * as stream from 'stream'
import * as fs from 'fs'

async function * randomGenerator(){
    for(let i = 0; i < 20; i++){
        let number = Math.floor(Math.random() * (2137 - (-420) + 1) + (-420))
        yield number
    }
}

const readable = stream.Readable.from(randomGenerator())

const file = fs.createWriteStream(`random-${Date.now()}.txt`)

readable.on('data', (chunk) => {
    file.write(chunk.toString()+'\n')
})