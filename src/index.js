const express = require('express')
const bodyParser = require('body-parser')

// testando att 2021

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}))
app.get('/',function(req,res){
    res.send("OK");
})


require('./app/controllers/index')(app);

app.listen(3000);