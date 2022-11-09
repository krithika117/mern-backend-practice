const express = require('express');
const app = express();
const noteRouter = require('./routes/noteRoutes');
const userRouter = require('./routes/userRoutes');

app.use('/users', userRouter);
app.use('/notes',noteRouter)

app.get('/', (req,res) => {
    res.send("Home")
});

app.listen(5000,() => {
    console.log("Running at port 5000");
});
