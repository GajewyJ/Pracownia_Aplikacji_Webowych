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
    res.json(students)
});
router.get('/students/:id', async (req, res) => {
    const studentId = Number(req.params.id);
    const student = await prisma.students.findUnique({
        where: {
            id: studentId,
        },
    })
    if(student != null){
        res.json(student)
    }
    else{
        res.status(404)
        res.json({"Error": "404"})
    }
});
router.get('/subjects', async (req, res) => {
    const subjects = await prisma.subjects.findMany()
    res.json(subjects)
});
router.get('/subjects/:id', async (req, res) => {
    const subjectId = Number(req.params.id)
    const subject = await prisma.subjects.findUnique({
        where: {
            id: subjectId,
        },
    })
    if(subject != null){
        res.json(subject)
    }
    else{
        res.status(404)
        res.json({"Error": "404"})
    }
})

module.exports = router