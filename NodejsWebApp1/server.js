
const port = process.env.PORT || 1337;
const express = require('express')
const app = express()
const authRouter = require('./authRouter')
const pg = require('pg');
const mysql = require("mysql2");

const mongoose = require("mongoose");

app.use(express.json())
app.use("/auth", authRouter)

const start = () => {
    try {
        mongoose.connect('mongodb+srv://george:123@cluster0.a32q0.mongodb.net/auth_roles?retryWrites=true&w=majority')
        app.listen(port, () => console.log('server started on port'))
    }
    catch (e) {
        console.log(e)
    }
}




start()
//app.listen(port);
