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
    },
    poBox:{
        type:Number,
        required:true
    },
    fax:{
        type:String,
        required:true
    }
   });

  var University = mongoose.model('University',universitySchema);

  module.exports=University;