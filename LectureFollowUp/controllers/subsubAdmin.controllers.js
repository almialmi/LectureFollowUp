const mongoose = require('mongoose');
const Subsub = mongoose.model('Subsub');
const Lecture = mongoose.model('Lecture');
const passport = require('passport');
const bcrypt = require('bcryptjs');


module.exports.login=(req,res,next)=>{
    Subsub.findOne({'email':req.body.email},(err,subsub)=>{
        if(!subsub) res.json({message:'Login failed,user not found '});
        subsub.comparePassword(req.body.password,(err,isMatch)=>{
              if(err) throw err;
              if(!isMatch) return res.status(400).json({
                  message:'Wrong Password'
              });
              res.status(200).send('Logged in successfully');
        });
    });
}
module.exports.autenticate = (req , res , next) => {
    //call for passport autentication
    passport.authenticate('subsubLocal' , (err , user , info) => {
        //error from passport middle ware
        if (err) return res.status(400).json(err);

        //registerd user
        else if(user) return res.status(200).json({"token" : user.generateJwt()});
        //unkown user or wrong password
        else 
        return res.status(404).json(info);
    })(req , res);
}

module.exports.lectureRegister = (req,res,next)=>{
    var lecture = new Lecture();
    lecture.firstName =req.body.firstName;
    lecture.middleName = req.body.middleName;
    lecture.lastName = req.body.lastName;
    lecture.email = req.body.email;
    lecture.mobile = req.body.mobile;
    lecture.university = req.body.university;
    lecture.educationStatus = req.body.educationStatus;
    lecture.role = req.body.role;
    lecture.study = req.body.study;
    lecture.educationField = req.body.educationField;
    lecture.department = req.body.department;
    lecture.password=req.body.password;
    lecture.save((err,doc)=>{
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

module.exports.fetchlectures = (req,res,next)=>{
    Lecture.find((err,result)=>{
          if(err){
              res.send(err);
        }
          else{
              res.send(result);
          }
    });
}

// module.exports.findOne =(req,res)=>{
//     Lecture.findById(req.params.id)
//     .then(lecture => {
//         if(!lecture) {
//             return res.status(404).send({
//                 message: "Lecture not found with id " + req.params.id
//             });            
//         }
//         res.send(lecture);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Lecture not found with id " + req.params.id
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving Lecture with id " + req.params.id
//         });
//     });

// }

module.exports.UpdateProfile= async(req,res)=>{
    console.log("request sent");
    if(!req.body.email && !req.body.password){
        return res.status(400).send({
                 message:"this content can't be empty"
        });
    }
    
    const salt = await bcrypt.genSaltSync(10);
    const password = await req.body.password;
    
    Subsub.findByIdAndUpdate(req.params.id,{
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile:req.body.mobile,
        university:req.body.university,
        educationStatus:req.body.educationStatus,
        role:req.body.role,
        study:req.body.study,
        department:req.body.department,
        password:bcrypt.hashSync(password, salt)
    
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with this " + req.params.id
            });
        }
        res.send({
               message:"Profile Update Successfully !!"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with this " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user profile with id " + req.params.id
        });
  });
  }

module.exports.update = (req,res)=>{
    
    // Validate Request
    if(!req.body.firstName && !req.body.middleName && !req.body.lastName && !req.body.email && 
        !req.body.mobile && !req.body.university&& !req.body.educationStatus && !req.body.role  && 
        !req.body.study && !req.body.educationField && !req.body.department &&!req.body.password) {
        return res.status(400).send({
            message: "For Lecture this contents can not be empty"
        });
    }

    // Find note and update it with the request body
    Lecture.findByIdAndUpdate(req.params.id, {
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile:req.body.mobile,
        university:req.body.university,
        educationStatus:req.body.educationStatus,
        role:req.body.role,
        study:req.body.study,
        educationField:req.body.educationField,
        department:req.body.department,
        password:req.body.password

    }, {new: true})
    .then(lecture => {
        if(!lecture) {
            return res.status(404).send({
                message: "Lecture not found with id " + req.params.id
            });
        }
        res.send(lecture);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Lecture not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Lecture with id " + req.params.id
        });
    });
}
module.exports.delete=(req,res)=>{
    Lecture.findByIdAndRemove(req.params.id)
    .then(lecture => {
        if(!lecture) {
            return res.status(404).send({
                message: "Lecture not found with id " + req.params.id
            });
        }
        res.send({message: "Lecture deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Lecture not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Lecture with id " + req.params.id
        });
    });

} 

module.exports.findByName=(req,res)=>{
    var query = req.params.query;
     Lecture.find({
         $text: {
             $search:query
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
 module.exports.selectiveUpdateProfile= async(req,res)=>{
    console.log("request sent");
    if(!req.body.email && !req.body.password){
        return res.status(400).send({
                 message:"this content can't be empty"
        });
    }
    
    const salt = await bcrypt.genSaltSync(10);
    const password = await req.body.password;
    
    Subsub.findByIdAndUpdate(req.params.id,{
        $set:{
            email:req.body.email,
            mobile:req.body.mobile,
            password:bcrypt.hashSync(password, salt)

        }
       
    
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with this " + req.params.id
            });
        }
        res.send({
               message:"Profile Update Successfully !!"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with this " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user profile with id " + req.params.id
        });
  });
  }
 