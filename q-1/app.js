require("dotenv").config({ path: "./q-1/.env" });
const express = require("express");
const app = express();
const connectDB = require("./db/connection");
const commonRouter = require("./routes/commonRouter");
const path = require("path");

const port = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))

// middlewares
app.use(express.static("./q-1/public"));
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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