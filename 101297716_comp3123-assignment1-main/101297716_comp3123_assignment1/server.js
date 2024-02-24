const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const UserRoute = require('./routes/UserRoutes');
const EmployeeRoute = require('./routes/EmployeeRoutes');

const app = express();

app.use(express.json());

app.use('/api/v1/user', UserRoute); 
app.use('/api/v1/emp', EmployeeRoute); 

const DB_URL = "mongodb+srv://atassinizar:123@cluster0.ahhkuhg.mongodb.net/Comp3123Assignment1?retryWrites=true&w=majority"


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.get('/', (req, res) => {
    res.send("<h1Assignment 1</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});