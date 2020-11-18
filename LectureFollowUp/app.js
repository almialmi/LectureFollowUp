require('./config/config');
require('./models/db');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
 const { success , error } = require('consola');


var app = express();

const rstIndex = require('./routes/index.router');


app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));
app.use(passport.initialize());
require("./config/passportConfig")(passport);
app.use('/api',rstIndex);



app.use((err,req,res,next) =>{
    if (err.name =='ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

app.listen(process.env.PORT,() =>console.log('Server Started at port:'+ process.env.PORT));