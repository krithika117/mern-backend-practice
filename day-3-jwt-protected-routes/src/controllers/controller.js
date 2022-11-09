const dotenv = require('dotenv')
dotenv.config()
const userModel = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//Users
const userSignup = async (req, res) => {
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
        const token = jwt.sign({email:result.email, id: result._id}, "NOTESAPI")
        res.status(201).json({message:"User signed up"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"})
    }
}

const userSignin = async (req, res) => {
    const { email, password, username } = req.body;

    try{
        const existingUser = await userModel.findOne({ email:email })
        if(existingUser && username==="admin" && email==="admin@gmail.com" && bcrypt.compare(password, existingUser.password)){
            return res.status(400).json({message:"Admin Prohibited"})
        }
        if(!existingUser){
            return res.status(404).json({message:"User not found"})
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword){
            return res.status(400).json({message:"Invalid Creds"})
        }

        const token = jwt.sign({email:existingUser.email, id: existingUser._id},"NOTESAPI")
        res.status(201).json({message:"User logged in"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"})
    }
}

//Admin

const adminSignin = async (req, res) => {
    const { email, password, username } = req.body;
    try{
        const existingUser = await userModel.findOne({ email:email })
        if(existingUser && ((username!="admin") || (email!="admin@gmail.com") || !(bcrypt.compare(password, existingUser.password)))){
            return res.status(400).json({message:"No permissions"})
        }
        if(!existingUser){
            return res.status(404).json({message:"User not found"})
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword){
            return res.status(400).json({message:"Invalid Creds"})
        }

        const token = jwt.sign({email:existingUser.email, id: existingUser._id},"NOTESAPI")
        res.status(201).json({message:"Admin logged in"});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "Something went wrong"})
    }
}
module.exports = { userSignup, userSignin, adminSignin }