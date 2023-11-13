const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const router = require('./public/js/apiRouter')
const { MongoClient, ServerApiVersion } = require('mongodb');


app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', router)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'))
})
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname + '/kontakt.html'))
})
app.post('/kontakt', async (req, res) => {
    const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
    });
    async function run() {
        try {
            const db = await client.connect();
            console.log('Succesfully connected to MongoDB!')
            const dbo = await db.db('nodestudentssubjects')
            let message = {}
            if(req.body.imie != null && req.body.imie != '' && req.body.imie != ' '){
                message = {
                    'name':req.body.imie,
                    'email':req.body.email,
                    'subject':req.body.temat,
                    'message':req.body.wiadomosc
                }
            }
            else{
                message = {
                    'email':req.body.email,
                    'subject':req.body.temat,
                    'message':req.body.wiadomosc
                }
            }
            try{
                await dbo.collection('contact').insertOne(message)
                console.log('One document created')
            }
            catch (e){
                throw e
            }

            await db.close()
        }
        finally {
            await client.close();
        }
    }
    run().catch(console.dir);
    

    res.redirect('/')
})

app.listen(8080)
console.log('Server running at localhost:8080')
