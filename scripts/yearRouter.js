const express = require('express');
const yearRouter = express.Router();
const dummyDb = require('./dummyDb.js');

// Return all persons that have given year
yearRouter.get('/:year', (req, res) => {
    const year = req.params.year;
    const result = [];

    // SHOULD BE REWRITTEN FOR MONGO
    dummyDb.persons.forEach((person) => {
        if (person.leaves[year]) {
            result.push(person);
        }
    })
    res.send(result);
})

module.exports = yearRouter;