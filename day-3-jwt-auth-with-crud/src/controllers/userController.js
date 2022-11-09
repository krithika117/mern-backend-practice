const userModel = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY = "NOTESAPI"

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email:email })
        if(existingUser){
            return res.status(400).json({message:"Existing User"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.create({
            email:email,
            password:hashedPassword,
            username:username
        });
        const token = jwt.sign({email:result.email, id: result._id}, SECRET_KEY)
        res.status(201).json({user: result, token: token});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "something went wrong"})
    }
}

const signin = (req, res) => {

}

module.exports = { signup, signin }