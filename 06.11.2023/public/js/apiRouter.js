const express = require('express')
const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient

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

router.get('/', (req, res) => {
    res.json(links)
});
router.get('/students', async (req, res) => {
    const students = await prisma.students.findMany()
    res.setHeader('Content-Type', 'html')
    res.write("<head><style>body{display: flex; justify-content: center; align-items: center; background-color: rgb(190, 190, 190);} td, th{border: 1px solid black; padding: 20px; font-size: 1.3em;} table{border-collapse: collapse; background-color: white;}</style></head>")
    res.write("<body>")
    res.write("<table>")
    res.write("<tr><th>ID</th><th>Imie</th><th>Nazwisko</th><th>E-mail</th></tr>")
    students.forEach(element => {
        res.write("<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.surname + "</td><td>" + element.email + "</td></tr>")
        res.write("\n")
    })
    res.write("</body>")
    res.write("</table>")
    res.end()
});
router.get('/students/:id', async (req, res) => {
    const studentId = Number(req.params.id);
    const student = await prisma.students.findUnique({
        where: {
            id: studentId,
        },
    })
    if(student != null){
        res.setHeader('Content-Type', 'html')
        res.write("<head><style>body{display: flex; justify-content: center; align-items: center; background-color: rgb(190, 190, 190);} td, th{border: 1px solid black; padding: 20px; font-size: 1.3em;} table{border-collapse: collapse; background-color: white;}</style></head>")
        res.write("<body>")
        res.write("<table>")
        res.write("<tr><th>ID</th><th>Imie</th><th>Nazwisko</th><th>E-mail</th></tr>")
        const element = student
        res.write("<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.surname + "</td><td>" + element.email + "</td></tr>")
        res.write("\n")
        res.write("</body>")
        res.write("</table>")
        res.end()
    }
    else{
        res.status(404)
        res.json({"Error": "404"})
    }
});
router.get('/subjects', async (req, res) => {
    const subjects = await prisma.subjects.findMany()
    res.setHeader('Content-Type', 'html')
    res.write("<head><style>body{display: flex; justify-content: center; align-items: center; background-color: rgb(190, 190, 190);} td, th{border: 1px solid black; padding: 20px; font-size: 1.3em;} table{border-collapse: collapse; background-color: white;}</style></head>")
    res.write("<body>")
    res.write("<table>")
    res.write("<tr><th>ID</th><th>Nazwa</th><th>Ilosc godzin w tygodniu</th></tr>")
    subjects.forEach(element => {
        res.write("<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.hoursAWeek + "</td></tr>")
        res.write("\n")
    })
    res.write("</body>")
    res.write("</table>")
    res.end()
});
router.get('/subjects/:id', async (req, res) => {
    const subjectId = Number(req.params.id)
    const subject = await prisma.subjects.findUnique({
        where: {
            id: subjectId,
        },
    })
    if(subject != null){
        res.setHeader('Content-Type', 'html')
        res.write("<head><style>body{display: flex; justify-content: center; align-items: center; background-color: rgb(190, 190, 190);} td, th{border: 1px solid black; padding: 20px; font-size: 1.3em;} table{border-collapse: collapse; background-color: white;}</style></head>")
        res.write("<body>")
        res.write("<table>")
        res.write("<tr><th>ID</th><th>Nazwa</th><th>Ilosc godzin w tygodniu</th></tr>")
        const element = subject
        res.write("<tr><td>" + element.id + "</td><td>" + element.name + "</td><td>" + element.hoursAWeek + "</td></tr>")
        res.write("\n")
        res.write("</body>")
        res.write("</table>")
        res.end()
    }
    else{
        res.status(404)
        res.json({"Error": "404"})
    }
})

module.exports = router