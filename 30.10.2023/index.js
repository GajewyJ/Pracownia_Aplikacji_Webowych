const express = require('express')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const router = require('./public/js/apiRouter')
const mysql = require('mysql')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:''
})
connection.connect((err) => {
    if(err){
        throw err
    }
    else{
        connection.query("USE node_students_subjects")
        if(err) throw err
    }
})

app.use('/api', router)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'))
})
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname + '/kontakt.html'))
})
app.post('/kontakt', (req, res) => {
    const insertQuery = "INSERT INTO messages VALUES(0, '"+ req.body.imie +"', '"+ req.body.email +"', '"+ req.body.temat +"', '"+ req.body.wiadomosc +"')"

    connection.query(insertQuery, (err) => {
        if(err) throw err
    })

    res.redirect('/')
})

app.listen(8080);
console.log('Server running at localhost:8080');