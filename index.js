const express = require("express");
const app = express();
const mongoose = require("mongoose")
const UserRoute = require("./routes/userRoute")
const PostRoute = require("./routes/postRoute")
const cors = require("cors");
require("dotenv").config()
app.use(express.json());
app.use(cors())
app.use("/users",UserRoute);
app.use("/posts",PostRoute);

app.get("/",(req,res)=>{

    res.send("Welcome to the server")
})

const connect = async()=>{
    try {

        await mongoose.connect(process.env.URL);

        console.log("connected")
        
    } catch (error) {
        
        console.log(error)
    }
}
app.listen(8080,()=>{

    connect()

    console.log("listening")
})