const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const userRouter = require('./routes/user-routes');
const adminRouter = require('./routes/admin-routes');

const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/admin',adminRouter)

app.get('/', (req,res) => {
    res.send("Home")
});
try{
    mongoose.connect("mongodb+srv://admin:admin@cluster0.osvx9fb.mongodb.net/test?retryWrites=true&w=majority")
    console.log("Connected")
    app.listen(5000,() => {
        console.log("Running at port 5000");
    });
}

catch(err){
    console.log(err);
}
