const express = require('express');
const { userSignup, userSignin } = require('../controllers/controller');
const userRouter = express.Router();

userRouter.get('/', (req, res) => {
    res.send("Users")
});

userRouter.post('/signup', userSignup);

userRouter.post('/signin', userSignin);

module.exports = userRouter;
