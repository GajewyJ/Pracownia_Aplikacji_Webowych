const express = require('express')
const mysql = require('mysql')

const app = express()

const router = express.Router()
router.use((req, res, next) => {
    next()
})
const links = {
    "api/students":"Lista studentów",
    "api/students/id":"Student o podanym ID",
    "api/subjects":"Lista przedmiotów",
    "api/subjects/id":"Przedmiot o podanym ID"
}
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

router.get('/', (req, res) => {
    res.json(links)
});
router.get('/students', (req, res) => {
    connection.query("SELECT * FROM students", (err, result) => {
        if(err) throw err
        res.setHeader('Content-Type', 'html')
        res.write("<head><style>body{display: flex; justify-content: center; align-items: center; background-color: rgb(190, 190, 190);} td, th{border: 1px solid black; padding: 20px; font-size: 1.3em;} table{border-collapse: collapse; background-color: white;}</style></head>")
        res.write("<body>")
        res.write("<table>")
        res.write("<tr><th>ID</th><th>Imie</th><th>Nazwisko</th><th>E-mail</th></tr>")
        result.forEach(element => {
            res.write("<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.surname + "</td><td>" + element.email + "</td></tr>")
            res.write("\n")
        })
        res.write("</body>")
        res.write("</table>")
        res.end()
    })
});
router.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    connection.query("SELECT * FROM students WHERE id LIKE " + studentId + "", (err, result) => {
        if(err) throw err
        if(result.length != 0){
            res.setHeader('Content-Type', 'html')
            res.write("<head><style>body{display: flex; justify-content: center; align-items: center; background-color: rgb(190, 190, 190);} td, th{border: 1px solid black; padding: 20px; font-size: 1.3em;} table{border-collapse: collapse; background-color: white;}</style></head>")
            res.write("<body>")
            res.write("<table>")
            res.write("<tr><th>ID</th><th>Imie</th><th>Nazwisko</th><th>E-mail</th></tr>")
            result.forEach(element => {
                res.write("<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.surname + "</td><td>" + element.email + "</td></tr>")
                res.write("\n")
            })
            res.write("</body>")
            res.write("</table>")
            res.end()
        }
        else{
            res.status(404)
            res.json({"Error": "404"})
        }
        
    })
});
router.get('/subjects', (req, res) => {
    connection.query("SELECT * FROM subjects", (err, result) => {
        if(err) throw err
        res.setHeader('Content-Type', 'html')
        res.write("<head><style>body{display: flex; justify-content: center; align-items: center; background-color: rgb(190, 190, 190);} td, th{border: 1px solid black; padding: 20px; font-size: 1.3em;} table{border-collapse: collapse; background-color: white;}</style></head>")
        res.write("<body>")
        res.write("<table>")
        res.write("<tr><th>ID</th><th>Nazwa</th><th>Ilosc godzin w tygodniu</th></tr>")
        result.forEach(element => {
            res.write("<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.hoursAWeek + "</td></tr>")
            res.write("\n")
        })
        res.write("</body>")
        res.write("</table>")
        res.end()
    })
});
router.get('/subjects/:id', (req, res) => {
    const subjectId = req.params.id;
    connection.query("SELECT * FROM subjects WHERE id like " + subjectId + "", (err, result) => {
        if(err) throw err
        if(result.length != 0){
            res.setHeader('Content-Type', 'html')
            res.write("<head><style>body{display: flex; justify-content: center; align-items: center; background-color: rgb(190, 190, 190);} td, th{border: 1px solid black; padding: 20px; font-size: 1.3em;} table{border-collapse: collapse; background-color: white;}</style></head>")
            res.write("<body>")
            res.write("<table>")
            res.write("<tr><th>ID</th><th>Nazwa</th><th>Ilosc godzin w tygodniu</th></tr>")
            result.forEach(element => {
                res.write("<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.hoursAWeek + "</td></tr>")
                res.write("\n")
            })
            res.write("</body>")
            res.write("</table>")
            res.end()
        }
        else{
            res.status(404)
            res.json({"Error": "404"})
        }
    })
})

module.exports = router
