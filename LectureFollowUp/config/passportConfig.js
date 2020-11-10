const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

var User = mongoose.model('User');
var Sub = mongoose.model('Sub');
var Subsub = mongoose.model('Subsub');
var Checker = mongoose.model('Checker');

function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
}

module.exports = function(passport) {

passport.serializeUser(function (userObject, done) {
    // userObject could be a Model1 or a Model2... or Model3, Model4, etc.
    let userGroup = "model1";
    let userPrototype =  Object.getPrototypeOf(userObject);
    if (userPrototype === User.prototype) {
         userGroup = "model1";
    } else if (userPrototype === Sub.prototype) {
      userGroup = "model2";
    }
    else if (userPrototype === Subsub.prototype) {
        userGroup = "model3";
      }
    else if (userPrototype === Checker.prototype) {
        userGroup = "model4";
    }
    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);
});

passport.deserializeUser(function (sessionConstructor, done) {
    if (sessionConstructor.userGroup == 'model1') {
      User.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    } else if (sessionConstructor.userGroup == 'model2') {
      Sub.findOne({
          _id: sessionConstructor.userId
      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
          done(err, user);
      });
    }else if (sessionConstructor.userGroup == 'model3') {
        Subsub.findOne({
            _id: sessionConstructor.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
      }else if (sessionConstructor.userGroup == 'model4') {
        Checker.findOne({
            _id: sessionConstructor.userId
        }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.
            done(err, user);
        });
      }

});

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

            });
            
    }));

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
                else if((sub.isActive === false)){
                    return done(null,false,{message:'Deactivated account'}); 
    
                }        
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
                else if((subsub.isActive === false)){
                    return done(null,false,{message:'Deactivated account'}); 
                }     
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
                else if(!check.verifyPassword(password) ) 
                    return done(null,false,{message:'Wrong password.'});  
                else if((check.isActive === false)){
                    return done(null,false,{message:'Deactivated account'}); 

                }      
                else
                   return done(null,check);         
            });
    })
);


}
