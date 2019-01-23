const express = require('express');
const db = require('../config/mongodb-conect')

routerCrud = express.Router()

routerCrud.post('/insert', async function (req, res) {
    let persona = req.body
    try {
        let result = await db.insert('personas', persona);
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

routerCrud.get('/',async (req, res) => {
    await db.connect();
    res.send("hay fue")
});

module.exports = {
    routerCrud
}