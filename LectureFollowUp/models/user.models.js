const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:"Email can\'t be empty ",
        unique:true
    },
    password:{
        type:String,
        require:"password can\'t be empty ",
        minlength:[4,'password must be at least 4 character']
    },
    salSecrete: String
});

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
userSchema.methods.comparePassword = function(condidatePassword,checkPassword){
    bcrypt.compare(condidatePassword,this.password,function(err,isMatch){
        if(err) return checkPassword(err);
        checkPassword(null,isMatch);
    });
}
userSchema.methods.verifyPassword = function (password){
    return bcrypt.compareSync(password , this.password);
};
userSchema.methods.generateJwt = function(){
    return jwt.sign({_id : this._id},
        process.env.JWT_SECRET,
        {
            expiresIn :process.env.JWT_EXP
 } );
    
 
}



mongoose.model('User',userSchema);