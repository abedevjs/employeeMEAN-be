const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const { v4 } = require('uuid');


// const { mongoose } = require('./db');
const employeeController = require('./controllers/employeeController')

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));

// app.listen(3000, () => console.log('Server running on port: 3000'))

app.use('/employees', employeeController);



module.exports = app