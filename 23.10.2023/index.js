const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const router = require('./public/js/apiRouter')

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
    console.log(req.body)
    res.redirect('/')
})

app.listen(8080);
console.log('Server running at localhost:3000');