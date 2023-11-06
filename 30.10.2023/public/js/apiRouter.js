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
        res.json(result)
    })
});
router.get('/students/:id', (req, res) => {
    const studentId = req.params.id;
    connection.query("SELECT * FROM students WHERE id LIKE " + studentId + "", (err, result) => {
        if(err) throw err
        if(result.length != 0){
            res.json(result)
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
        res.json(result)
    })
});
router.get('/subjects/:id', (req, res) => {
    const subjectId = req.params.id;
    connection.query("SELECT * FROM subjects WHERE id like " + subjectId + "", (err, result) => {
        if(err) throw err
        if(result.length != 0){
            res.json(result)
        }
        else{
            res.status(404)
            res.json({"Error": "404"})
        }
    })
})

module.exports = router
