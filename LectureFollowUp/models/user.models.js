const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
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
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String
    },
    university:{
        type: String
    },
    compass:{
        type:String

    },
    isActive:{
        type:Boolean,
        index:true,
        default:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type: String,
         default: 'SuperAdmin',
         enum: ["SuperAdmin", "UnivAdmin", "UnivHr","Checker"]
    
        },
    salSecrete: String
},{timestamps:true});

userSchema.path('email').validate((val)=>{
    emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(val);
    },'Invalid e-mail');

userSchema.pre('save',function(next){
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(this.password,salt,(err,hash)=>{
            this.password = hash;
           this.salSecrete =salt;
            next();
        });
    });
});


userSchema.methods.verifyPassword = function (password){
    return bcrypt.compareSync(password , this.password);
};
userSchema.methods.generateJwt = function(){
    return jwt.sign({_id : this._id,
                    role:this.role,
                    email:this.email },
                 process.env.JWT_SECRET,
               { expiresIn :process.env.JWT_EXP });
    
 
}



mongoose.model('User',userSchema);