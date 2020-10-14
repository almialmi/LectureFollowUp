const mongoose = require('mongoose');
const passport = require('passport');
const { response } = require('express');
const User = mongoose.model('User');
const Sub= mongoose.model('Sub');
const _ = require('lodash');
const Checker = mongoose.model('Checker');
module.exports.register = (req,res,next) =>{
      var user = new User();
      user.email = req.body.email;
      user.password = req.body.password;
      user.save((err,doc)=>{
          if(!err)
              res.send(doc);
          else{
              if(err.code  == 11000)
                  res.status(422).send(['Duplicate email address found.']);
              else
                  return next(err);    
          }
              
      });
}
module.exports.login=(req,res,next)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) {res.json({message:'Login failed,user not found '});}
        else{
        user.comparePassword(req.body.password,(err,isMatch)=>{
              if(err) throw err;
              if(!isMatch) return res.status(400).json({
                  message:'Wrong Password'
              });
              res.status(200).send('Logged in successfully');
        });
    }
    });
}
// register checker
module.exports.registerChecker = (req,res,next) =>{
    var checker = new Checker();
    checker.email = req.body.email;
    checker.password = req.body.password;
    checker.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else{
            if(err.code  == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);    
        }
            
    });
  }
  //fetch checker
  module.exports.fetchChecker = (req,res,next)=>{
    Checker.find((err,result)=>{
          if(err){
              res.send(err);
        }
          else{
              res.send(result);
          }
    });
  }
module.exports.autenticate = (req , res , next) => {
    //call for passport autentication
    passport.authenticate('local' , (err , user , info) => {
        //error from passport middle ware
        if (err) return res.status(400).json(err);

        //registerd user
        else if(user) return res.status(200).json({"token" : user.generateJwt()});
        //unkown user or wrong password
        else 
        return res.status(404).json(info);
    })(req , res);
}

module.exports.subAdminRegister = (req,res,next)=>{
    var subAdmin = new Sub({
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile:req.body.mobile,
        university:req.body.university,
        password:req.body.password

    });
    
    subAdmin.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else{
            if(err.code  == 11000)
                res.status(422).send(['Duplicate email address found.']);
            else
                return next(err);    
        }
            
    });
}

module.exports.fetchSubAdmin = (req,res,next)=>{
    Sub.find((err,result)=>{
          if(err){
              res.send(err);
        }
          else{
              res.send(result);
          }
    });
}
//find by id
// module.exports.findOne =(req,res)=>{
//     Sub.findById(req.params.id)
//     .then(sub => {
//         if(!sub) {
//             return res.status(404).send({
//                 message: "Sub Admins not found with id " + req.params.id
//             });            
//         }
//         res.send(sub);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Sub Admins not found with id " + req.params.id
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving Sub Admins with id " + req.params.id
//         });
//     });

// }
// find by name

module.exports.findByName=(req,res)=>{
    var query = req.params.query
    Sub.find({
        
        $text: {
            $search: query
        }
        
    }, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    })
}

module.exports.update = (req,res)=>{
    
        // Validate Request
        if(!req.body.firstName && !req.body.middleName && !req.body.lastName && !req.body.email && !req.body.mobile && !req.body.university && !req.body.password) {
            return res.status(400).send({
                message: "Sub Admin this contents can not be empty"
            });
        }
    
        // Find note and update it with the request body
        Sub.findByIdAndUpdate(req.params.id, {
            firstName:req.body.firstName,
            middleName:req.body.middleName,
            lastName:req.body.lastName,
            email:req.body.email,
            mobile:req.body.mobile,
            university:req.body.university,
             password:req.body.password

        }, {new: true})
        .then(sub => {
            if(!sub) {
                return res.status(404).send({
                    message: "Sub Admin not found with id " + req.params.id
                });
            }
            res.send(sub);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Sub Admin not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating Sub Admin with id " + req.params.id
            });
        });
}

module.exports.delete=(req,res)=>{
    Sub.findByIdAndRemove(req.params.id)
    .then(sub => {
        if(!sub) {
            return res.status(404).send({
                message: "Sub Admin not found with id " + req.params.id
            });
        }
        res.send({message: "Sub Admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Sub Admin not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete SuB Admin with id " + req.params.id
        });
    });

}
module.exports.userProfile = (req , res ,next) =>{
    User.findOne({_id: req._id},
        (err , user) =>{
            if(!user)
            return res.status(404).json({status : false , message: "user record not found"});
            else
            return res.status(200).json({status : true , user : _.pick(user,['firstName', 'email'])});

        });

}
//update checker

module.exports.CheckerUpdate = (req,res)=>{
    
    // Validate Request
    if(!req.body.email && !req.body.password) {
        return res.status(400).send({
            message: "Checker of this contents can not be empty"
        });
    }

    // Find note and update it with the request body
    Checker.findByIdAndUpdate(req.params.id, {
        email:req.body.email,
        password:req.body.password

    }, {new: true})
    .then(check => {
        if(!check) {
            return res.status(404).send({
                message: "Checker not found with id " + req.params.id
            });
        }
        res.send(check);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Checker not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Checker with id " + req.params.id
        });
    });
}

// delete Checker

module.exports.CheckerDelete=(req,res)=>{
    Checker.findByIdAndRemove(req.params.id)
    .then(checker => {
        if(!checker) {
            return res.status(404).send({
                message: "Checker not found with id " + req.params.id
            });
        }
        res.send({message: "Checker deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Checker not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete checker with id " + req.params.id
        });
    });

}