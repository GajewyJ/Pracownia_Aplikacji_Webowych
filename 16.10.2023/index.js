const express = require("express");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'))

});
app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname + '/kontakt.html'))
});

app.listen(3000);
console.log('Server running at 3000');