const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const router = require('./public/js/apiRouter')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', router)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'))
})
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname + '/kontakt.html'))
})
app.post('/kontakt', (req, res) => {
    async function main() {
        const message = await prisma.messages.create({
            data: {
                name: req.body.imie,
                email: req.body.email,
                subject: req.body.temat,
                message: req.body.wiadomosc
            },
          })
    }
      
    main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })

    res.redirect('/')
})

app.listen(8080);
console.log('Server running at localhost:8080');