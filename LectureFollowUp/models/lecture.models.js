const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var lectureSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
      },
    middleName:{
        type:String,
        require:true
    },  
    lastName:{
        type:String,
        require:true
     },
    email:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
       
    },
    university:{
        type:String,
        require:true

    },
    educationStatus:{
            type:String,
            require:true
    },
    role:{
          type:String,
          require:true
    },
    study:{
           type:String,
           require:true
    },
    educationField:{
          type:String,
          require:true
    },
    department:{
           type:String,
           require:true
    }
    
},{timestamps:true});

lectureSchema.path('email').validate((val)=>{
    emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(val);
},'Invalid e-mail');



lectureSchema.index({firstName:'text', middleName:'text',lastName:'text'});

mongoose.model('Lecture',lectureSchema);