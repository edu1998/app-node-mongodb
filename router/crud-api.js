const express = require('express');
const db = require('../config/mongodb-conect')

routerCrud = express.Router()

routerCrud.post('/insertmany', async function (req, res) {
    let persona = req.body
    try {
        let result = await db.insertOne('document',persona);
        res.status(500).send(result)
    } catch (error) {
        // res.status(500)send(error)
    }
})

routerCrud.get('/', (req, res) => {
    res.send("sirve esta verga");
});

module.exports = {
    routerCrud
}