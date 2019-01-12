const express = require('express')
const bodyParser = require('body-parser')
const db = require('./config/mongodb-conect')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.post('/', async function (req, res) {
    let persona = req.body
    let result = await db.insertManyM(persona);
    res.json(result)
})

app.listen(3000, () => {
    console.log("Listening port 3000");
})