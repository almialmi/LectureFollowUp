const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var lectureSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:"First Name can\'t be empty "
      },
    middleName:{
        type:String,
        require:"Middle Name can\'t be empty "

    },  
    lastName:{
        type:String,
        require:"Last Name can\'t be empty ",
     },
    email:{
        type:String,
        require:"Email can\'t be empty "
    },
    mobile:{
        type:String,
        require:"Phone number can\'t be empty "
       
    },
    university:{
        type:String,
        require:"University can\'t be empty "

    },
    educationStatus:{
            type:String,
            require:"Education Status can\'t be empty"
    },
    role:{
          type:String,
          require:"Role can\'t be empty"
    },
    study:{
           type:String,
           require:"Study can\'t be empty"
    },
    educationField:{
          type:String,
          require:"Education Filed can\'t be empty"
    },
    department:{
           type:String,
           require:"Department can\'t be empty"
    }
    
});

lectureSchema.path('email').validate((val)=>{
    emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(val);
    },'Invalid e-mail');

lectureSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password = hash;
            this.salSecrete =salt;
            next();
        });
    });
});
lectureSchema.methods.comparePassword = function(condidatePassword,checkPassword){
    bcrypt.compare(condidatePassword,this.password,function(err,isMatch){
        if(err) return checkPassword(err);
        checkPassword(null,isMatch);
    });
}

lectureSchema.index({firstName:'text', middleName:'text',lastName:'text'});

mongoose.model('Lecture',lectureSchema);