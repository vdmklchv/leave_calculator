const express = require('express');
const leavesPerYearSettingsRouter = express.Router();
const dummyDb = require('./dummyDb');

leavesPerYearSettingsRouter.use(express.json());

// GET LEAVE LIMITS FROM DB
leavesPerYearSettingsRouter.get('/', (req, res) => {
    res.send(dummyDb.leavesPerYear);
})

// POST NEW LIMIT TO DB
leavesPerYearSettingsRouter.post('/', (req, res) => {
    dummyDb.leavesPerYear = req.body;
    res.send(dummyDb.leavesPerYear);
})




leavesPerYearSettingsRouter.use((err, req, res, next) => {
    res.status(404).json({
        error: {
            message: err.message
        }
    });
})

module.exports = leavesPerYearSettingsRouter;