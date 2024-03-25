const express  = require("express")//it is a framework which provides extra functionality/features to node.js
const helmet = require("helmet");//for secure request(http)
const mongoose = require("mongoose");//for modelling database schema
const dotenv = require("dotenv");//Secure passwords , important data 
const morgan = require("morgan");//log info about req and res 

const app = express();
dotenv.config()


mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true
}).then(()=>console.log("MongoDB connection established")).catch("Error")

app.use(express.json())
app.use(helmet)
app.use(morgan("common"))

app.listen(8000, ()=>{
    console.log("Backend server listening")
})