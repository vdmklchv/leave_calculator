const express = require('express');
const settingsRouter = express.Router();
const leavesPerYearSettingsRouter = require('./leavesPerYearSettingsRouter');

settingsRouter.use('/lpe', leavesPerYearSettingsRouter);

module.exports = settingsRouter;