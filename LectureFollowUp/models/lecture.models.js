const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var lectureSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
      },
    middleName:{
        type:String,
        required:true
    },  
    lastName:{
        type:String,
        required:true
     },
     gender:{
         type:String,
         required:true
     },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true,
        maxlength:10
       
    },
    university:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "University"

    },
    compass:{
        type:String,
        required:true

    },
    professionalTitle:{
            type:String,
            required:true
    },
    role:{
          type:String,
          required:true
    },
    study:{
           type:String,
           required:true
    },
    educationField:{
        type:String,
        required:true

    },
    department:{
           type:String,
           required:true
    },
    isViewed:{
        type:Boolean,
        index:true,
        default:false
    },
    workExperience:{
        type:Number,
        required:true
    },
    certificate:{
        type:String
    },
    researchArea:{
        type:String
    },
    futureResearchInterest:{
        type:String
    },
    numberOfPublications:{
        type:Number

    },
    homeBase:{
        type:String
    },
    latestEducationDocument:{
         data: String, 
         contentType: String 
    }

},{timestamps:true});

lectureSchema.path('email').validate((val)=>{
    emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(val);
},'Invalid e-mail');



lectureSchema.index({firstName:'text', middleName:'text',lastName:'text'});

var Lecture =mongoose.model('Lecture',lectureSchema);
module.exports = Lecture;