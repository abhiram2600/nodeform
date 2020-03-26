const express = require('express')
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const app = express()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "form",
    password: "johncena",
    port: 5432
});



app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
})

//app
app.post('/submit', urlencodedParser, (req, res) => {
    let na = req.body.name;
    let nu = Number(req.body.number);
    let values = [na, nu]
    let quer = 'INSERT INTO formdata(name,number)values($1, $2)';
    //"INSERT INTO formdata(name,number)values('na','nu')"
    pool.query(quer, values, (err, res) => {
        console.log(err, res)
        pool.end();
    })
    res.send(`welcome ${na} your number is ${nu} `)
})

app.listen(process.env.PORT)
