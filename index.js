const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
const {
    routerCrud
} = require('./router/crud-api');

const socketFunction = require('./socket/socket');

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use('/crud', routerCrud);

app.get('/', (req, res) => {
    res.send("hola desde mi host local")
});

io.on('connection', (socket) => {
    console.log('cliente conectado');
    socketFunction.mensaje(socket, io);
    socketFunction.disconnect(socket)
});

http.listen(8080, () => {
    console.log("Listening port 8080");
})