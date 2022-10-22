require("dotenv").config({ path: "./q-1/.env" });
const express = require("express");
const app = express();
const connectDB = require("./db/connection");
const commonRouter = require("./routes/commonRouter");
const ejs = require("ejs");
const path = require("path");

const port = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./q-1/views"))

app.use("/", commonRouter);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}`))
    }
    catch (ex) {
        console.log(ex);
    }
}
start();