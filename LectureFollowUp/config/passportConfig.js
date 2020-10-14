const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');
var Sub = mongoose.model('Sub');
var Subsub = mongoose.model('Subsub');
var Checker = mongoose.model('Checker');



passport.use('local',
    new localStrategy({usernameField:'email'},
    (username,password,done)=>{
        User.findOne({email:username},
            (err , user) =>{
                if(err)
                return done(err);
                //unknown user
                else if(!user)
                return done(null  , false ,{message : 'Email is not registered'});
                //wrong password
                else if(!user.verifyPassword(password))
                return done(null  , false ,{message : 'Wrong password'});

                else
                return done(null , user);

            } );
    })
);
passport.use('subLocal',
    new localStrategy({usernameField:'email'},
    (username,password,done)=>{
        Sub.findOne({email:username},
            (err,sub)=>{
                if(err)
                   return done(err);
                //unknown user   
                else if(!sub)
                  return done(null,false,{message:'Email not registered'});
                // wrong password  
                else if(!sub.verifyPassword(password)) 
                    return done(null , false ,{message:'Wrong password.'});
                else
                   return done(null,sub);         
            });
    })
);

passport.use('subsubLocal',
    new localStrategy({usernameField:'email'},
    (username,password,done)=>{
        Subsub.findOne({email:username},
            (err,subsub)=>{
                if(err)
                   return done(err);
                //unknown user   
                else if(!subsub)
                  return done(null,false,{message:'Email not registered'});
                // wrong password  
                else if(!subsub.verifyPassword(password)) 
                    return done(null,false,{message:'Wrong password.'});
                else
                   return done(null,subsub);         
            });
    })
);


passport.use('checkerLocal',
    new localStrategy({usernameField:'email'},
    (username,password,done)=>{
        Checker.findOne({email:username},
            (err,check)=>{
                if(err)
                   return done(err);
                //unknown user   
                else if(!check)
                  return done(null,false,{message:'Email not registered'});
                // wrong password  
                else if(!check.verifyPassword(password)) 
                    return done(null,false,{message:'Wrong password.'});
                else
                   return done(null,check);         
            });
    })
);



