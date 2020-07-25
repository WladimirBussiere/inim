require('dotenv').config();
const router = require('./router/index.router.js')
const express = require('express');
const {dbConnection} = require('./models/index.model.js');

const app = express();


app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});



app.use('/', router);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
});
