const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  },(err)=>{
    if(!err) {console.log('MongoDB connection succeeded');}
    else{console.log('Error in mongoDB Connection:' +JSON.stringify(err,undefined,2));}
});

require('./user.models');
require('./lecture.models');
require('./university.models');
require('./passwordResetToken.models');

