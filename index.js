// const mongoose = require('mongoose')

//! Environment configuration --start
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// console.log(process.env);

process.on('uncaughtException', err => {//! Handling bugs/error in any asyncronous code. Declared before we start our Express app
    console.log(err.name, err.message);
    process.exit(2);
});

const app = require('./main');
console.log(`App running on: ${app.get('env')}`);
//! Environment configuration --end

// mongoose.connect('mongodb://localhost:27017/FreeCodeCampMEAN', (err) => {
//     if (!err) console.log('db connection done');
//     else console.log('db connection fail:' + JSON.stringify(err, undefined, 2));
// });

//! Database setup --start
const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
// mongoose.connect(process.env.DATABASE_LOCAL, {
mongoose.connect(DB, {
    // useNewUrlParser: true, //tdk usah krn sdh pake mongoose v6
    // useCreateIndex: true, //tdk usah krn sdh pake mongoose v6
    // useFindAndModify: false //tdk usah krn sdh pake mongoose v6
}).then((data) => console.log(`Database is connected to: ${data.connection.host}`));
//! Database setup --end

//! Server --start
const port = process.env.PORT || 8000;
server = app.listen(port, () => {
    console.log(`port ${port}`);
});
//! Server --start

module.exports = mongoose;
