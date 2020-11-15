const passport = require('passport');
const mongoose = require('mongoose');
const {Strategy,ExtractJwt}= require('passport-jwt');
const SECRET = process.env.JWT_SECRET


var User = mongoose.model('User');

const opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET

}

module.exports = passport =>{
    passport.use(
        new Strategy(opts,async(payload,done)=>{
        await User.findById(payload.user_id)
        .then(user =>{
            if(user){
                return done(null,user);
            }
            return done(null,false);
        })
        .catch(err =>{
            return done(null,false);
        });
    })
    );
}




