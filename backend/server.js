require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');

const dataRoutes = require('./routes/route')


// express App
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/data',dataRoutes)

//Connect to mongo

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    //Listen for request 
    app.listen(process.env.PORT, ()=> {
        console.log("Connected to DB and listening on port", process.env.PORT);
        console.log("STATUS",mongoose.connection.readyState);
    })
})
.catch((err)=> {
    console.log(err)
})