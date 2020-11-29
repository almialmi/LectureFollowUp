const mongoose = require('mongoose');

var universitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
   });

   mongoose.model('University',universitySchema);