const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const app = express();
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/notes',noteRouter)

app.get('/', (req,res) => {
    res.send("Notes API")
});

try{
    mongoose.connect(process.env.MONGO_URL)
    console.log("Connected")
    app.listen(5000,() => {
        console.log("Running at port 5000");
    });
}

catch(err){
    console.log(err);
}

