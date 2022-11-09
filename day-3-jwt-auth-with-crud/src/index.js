const express = require('express');
const app = express();
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');

const mongoose = require('mongoose');

app.use(express.json());

app.use((req, res, next) => {
    console.log("HTTP Method - " + req.method + " ,URL - " + req.url)
    next();
})
app.use('/users', userRouter);
app.use('/notes',noteRouter)

app.get('/', (req,res) => {
    res.send("Home")
});

try{
    mongoose.connect('mongodb+srv://admin:admin@cluster0.osvx9fb.mongodb.net/?retryWrites=true&w=majority')
    console.log("Connected")
    app.listen(5000,() => {
        console.log("Running at port 5000");
    });
}

catch(err){
    console.log(err);
}

