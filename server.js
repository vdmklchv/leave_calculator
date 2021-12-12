// IMPORTS

const express = require('express');
const yearRouter = require('./scripts/yearRouter');
const personRouter = require('./scripts/personRouter');
const settingsRouter = require('./scripts/settingsRouter');

// SETUP
const PORT = process.env.PORT || 3000;
const app = express();

// MIDDLEWARE & ROUTERS
app.use('/years', yearRouter);
app.use('/persons', personRouter);
app.use('/settings', settingsRouter);


// LISTEN TO BACKEND REQUESTS
app.listen(PORT, () => {
    console.log(`Started listening on port ${PORT}`);
});