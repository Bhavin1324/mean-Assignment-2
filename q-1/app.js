require('express-async-errors');
require('dotenv').config({ path: './q-1/.env' });
const path = require('path');
const express = require('express');
const connectDB = require('./db/connection');
const FileNotFound = require('./middlewares/not-found');
const studentRouter = require('./routes/studentRouter');
const customErrorhandler = require('./middlewares/error-handler');
const app = express();
const port = process.env.PORT || 5000;
const helmet = require('helmet');

// adding bootstrap
app.use('/css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '../node_modules/jquery/dist')));

app.use(helmet());
app.use(express.static("./q-1/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// setting up common route for th API
app.use('/api/v1/students', studentRouter);
app.use(FileNotFound);
app.use(customErrorhandler)
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}`));
    }
    catch (ex) {
        console.log(ex)
    }
}
start();