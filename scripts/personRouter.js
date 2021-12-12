const express = require('express');
const personRouter = express.Router();
const dummyDb = require('./dummyDb.js');
const Person = require('./Person');

personRouter.use(express.json());

personRouter.get('/', (req, res) => {
    res.send(dummyDb.getPersons());
})

personRouter.post('/', (req, res) => {
    const person = new Person(req.body.name, req.body['start-leave'], req.body['has-leave-this-year'], req.body['remaining-leave'], req.body.leaves);
    dummyDb.addToDB(person);
    res.send(req.body);
})

module.exports = personRouter;