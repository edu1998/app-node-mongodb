const express = require('express')
const bodyParser = require('body-parser')
const {routerCrud} = require('./router/crud-api')

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use('/crud',routerCrud);

app.get('/', (req, res) => {
    res.send("hola desde mi host local")
});


app.listen(8080, () => {
    console.log("Listening port 8080");
})