const express = require('express');
const { adminSignin } = require('../controllers/controller');
const adminRouter = express.Router();

adminRouter.get('/', (req, res) => {
    res.send("Admin")
});

// adminRouter.post('/signup', adminSignup);

adminRouter.post('/signin', adminSignin);

module.exports = adminRouter;
