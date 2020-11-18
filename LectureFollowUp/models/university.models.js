const mongoose = require('mongoose');

var universitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    compass:{
        type:String,
        required:true
    }
   });

   mongoose.model('University',universitySchema);