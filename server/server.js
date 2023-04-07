const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({path: "./config.env"})

const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//mongodb connection
const con = require('./db/connection');

//routes
app.use(require('./routes/route'));



con.then(db => {
    if(!db) return process.exit(1);

    //listen to http server only when valid connection to mongodb
    app.listen(port, ()=>{
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    app.on('error', err => console.log(`Failed to connect to HTTP Server: ${err}`));
    //error in mongodb connection
}).catch(error => {
    console.log(`Connection Failed: ${error}`);
})