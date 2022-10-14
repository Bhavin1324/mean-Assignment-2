require("dotenv").config({path : "./q-3/.env"})
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./db/connection");
const path = require("path");
const studentRouter = require("./routes/studentRouter");

//port configuration
const port = process.env.PORT || 5000;

//middlewares
app.set("views",path.join(__dirname,'./views'));
app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.use("/", studentRouter);

// connection
async function start(){
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    }
    catch(ex){
        console.log(ex);
    }
}
start();


