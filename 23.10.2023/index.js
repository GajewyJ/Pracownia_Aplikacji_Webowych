const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({extended: true}));

const router = express.Router()

const links = {
    "api/students":"Lista studentów",
    "api/students/id":"Student o podanym ID",
    "api/subject":"Lista przedmiotów",
    "api/subject/id":"Przedmiot o podanym ID"
}
const students = [{
        "id":1,
        "name":"Anastazy",
        "surname":"Wrona",
        "email":"anastazy.wrona@gmail.com"
    },
    {
        "id":2,
        "name":"Wiktoria",
        "surname":"Nowicka",
        "email":"wika@nowicka.pl"
    },
    {
        "id":3,
        "name":"Milena",
        "surname":"Wiśniewska",
        "email":"wisniewska.milena@yahoo.com"
    },
    {
        "id":4,
        "name":"Gustaw",
        "surname":"Czarniecki",
        "email":"czarniecki12@gmail.com"
    },
    {
        "id":5,
        "name":"Błażej",
        "surname":"Grabowski",
        "email":"grabowski.blazej@gmail.com"
    },
    {
        "id":6,
        "name":"Sara",
        "surname":"Sawicka",
        "email":"sarka.sawka@gmail.com"
    },
    {
        "id":7,
        "name":"Michalina",
        "surname":"Maciejewska",
        "email":"misia.maciej@gmail.com"
    },
    {
        "id":8,
        "name":"Krystian",
        "surname":"Laskowski",
        "email":"krzychu.laska@gmail.com"
    },
    {
        "id":9,
        "name":"Kamil",
        "surname":"Ostrowski",
        "email":"kamilo11@gmail.com"
    },
    {
        "id":10,
        "name":"Izabela",
        "surname":"Mróz",
        "email":"belamroz23@gmail.com"
    }
]
const subjects = [
    {
        "id":1,
        "name":"Matematyka",
        "hoursAWeek":4
    },
    {
        "id":2,
        "name":"Język Polski",
        "hoursAWeek":3
    },
    {
        "id":3,
        "name":"Język Angielski",
        "hoursAWeek":2
    },
    {
        "id":4,
        "name":"Programowanie Aplikacji Webowych",
        "hoursAWeek":2
    },
    {
        "id":5,
        "name":"Pracownia Programowania Aplikacji Webowych",
        "hoursAWeek":2
    },
    {
        "id":6,
        "name":"Wiedza O Społeczeństwie",
        "hoursAWeek":1
    },
    {
        "id":7,
        "name":"Chemia",
        "hoursAWeek":1
    },
    {
        "id":8,
        "name":"Historia",
        "hoursAWeek":1
    },
    {
        "id":9,
        "name":"Pracownia Programowania Aplikacji Mobilnych",
        "hoursAWeek":1
    },
    {
        "id":10,
        "name":"Programowanie Aplikacji Mobilnych",
        "hoursAWeek":1
    },
]
router.use((req,res,next) => {
    console.log('Time: ', Date.now())
    next()
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'))

});
app.get('/kontakt', (req, res) => {
        res.sendFile(path.join(__dirname + '/kontakt.html'))
    })
app.post('/kontakt', (req, res) => {
    console.log(req.body)
    res.redirect('/')
});
router.get('/api', (req, res) => {
    res.json(links);
});
router.get('/api/students', (req, res) => {
    res.json(students);
});
router.get('/api/students/:id', (req, res) => {
    const studentId = req.params.id;
    const student = students.find(student => student.id == studentId)
    if(student){
        res.json(student)
    }
    else{
        res.status(404)
        res.json({"Error": "404"})
    }
});
router.get('/api/subjects', (req, res) => {
    res.json(subjects);
});
router.get('/api/subjects/:id', (req, res) => {
    const subjectId = req.params.id;
    const subject = subjects.find(subject => subject.id == subjectId)
    if(subject){
        res.json(subject)
    }
    else{
        res.status(404)
        res.json({"Error": "404"})
    }
});

app.listen(3000);
console.log('Server running at localhost:3000');