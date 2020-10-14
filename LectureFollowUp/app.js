require('./config/config');
require('./models/db');
require('./config/passportConfig');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');


var app = express();

const rstIndex = require('./routes/index.router');
const subAdmin = require('./routes/subAdmin.router');
const subsubAdmin = require('./routes/subsubAdmin.router');
const checker = require('./routes/checker.router');
//const role = require('./routes/role.router');


 
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));
app.use('/api',rstIndex);
app.use('/api2',subAdmin);
app.use('/api3',subsubAdmin);
app.use('/api4',checker);
//app.use('/api5' ,role );
app.use(passport.initialize());


app.use((err,req,res,next) =>{
    if (err.name =='ValidationError'){
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

app.listen(process.env.PORT,() =>console.log('Server Started at port:'+ process.env.PORT));