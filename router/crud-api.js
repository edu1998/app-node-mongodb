const express = require('express');
const db = require('../config/mongodb-conect')

routerCrud = express.Router()

routerCrud.post('/', async function (req, res) {
    let persona = req.body
    try {
        let result = await db.insert('personas', persona);
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

routerCrud.get('/', async (req, res) => {
    try {
        let result = await db.selectAll('personas');
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

routerCrud.put('/', async (req, res) => {
    try {
        let result = await db.updateMany('personas', {
            name: req.body.namefilter
        }, {
            $set: {
                name: req.body.nameupdate
            }
        });
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = {
    routerCrud
}