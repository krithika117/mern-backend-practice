const express = require('express');
const noteRouter = express.Router();

noteRouter.get('/', (req, res) => {
    res.send("GET Note")
});

noteRouter.post('/', (req, res) => {
    res.send("POST Note")
});

module.exports = noteRouter;