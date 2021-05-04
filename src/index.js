const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');


const app = express();


//environment variables
env.config();

const port = process.env.PORT;
const mongoPass = process.env.MONGO_PASSWORD;
const mongoAdmin = process.env.MONGO_ADMIN;
const database = process.env.MONGO_DATABASE;





// express body Parser
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));




//routes

app.get('/',(req,res,next)=>{
    res.status(200).json({
        message: "hello from Server"
    });
})
app.post("/data",(req,res,next)=>{
    res.status(201).json({
        message: req.body
    })
})

// Server
app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
    mongoose.connect(`mongodb+srv://${mongoAdmin}:${mongoPass}@cluster0.rxznn.mongodb.net/${database}?retryWrites=true&w=majority`,
 {
     useNewUrlParser: true, 
     useUnifiedTopology: true}).then(()=>{
     console.log("database connected");
 });

})