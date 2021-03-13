const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const Lecture=mongoose.model('Lecture');
const University=mongoose.model('University');
const passwordResetToken=mongoose.model('passwordResetToken');
const nodemailer = require('nodemailer');
const async = require('async');
const crypto = require('crypto');
const fs = require('fs');
var path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

global.__basedir = __dirname;

/*
const fetchUser = async(role,res)=>{
   
        User.find({role:role},{password: 0,salSecrete:0,__v:0},(err,result)=>{
            if(err){
                res.send(err)
    
            }else{
                res.send(result)
            }
        }).populate('university');
}

const fetchUnivHr=async(role,university,res)=>{
   
    User.find({role:role,university:university},{password: 0,salSecrete:0,__v:0},(err,result)=>{
        if(err){
            res.send(err)

        }else{
            res.send(result)
        }
    }).populate('university');
} */


//login User

module.exports.login = async(req , res , next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message:'Email is not found',
                success:false
            })
        }
        if(user.isActive === false){
            return res.status(403).json({
                message:'Your Account is deactivated',
                success:false
            })

        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            let token = jwt.sign({
                user_id:user._id,
                role:user.role,
                email:user.email,
                university:user.university,
                compass:user.compass },
            process.env.JWT_SECRET,
          { expiresIn :process.env.JWT_EXP });
          let result ={
              token: `${token}`
             }
         return res.status(200).json({
              ...result,
              message:'Login successfully !!',
              success:true
        }) 


        }else{
            return res.status(403).json({
                message:'Incorrect password',
                success:false
            });

        }
       } catch (error) {
        next(error);
       } 
}

module.exports.Authenticate = passport.authenticate("jwt",{session:false});

// fetch User

module.exports.fetchUnivAdmin = async (req,res)=>{
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
       
        const offset = page ? page * limit : 0;
    
        console.log("offset = " + offset);    
    
        let result = {};
        let numOfStaffs;
		let role = 'UnivAdmin'

        
        numOfStaffs = await User.countDocuments({});
        result = await User.find({role:role},{password: 0,salSecrete:0,__v:0}) 
                              .populate('university')
                              .skip(offset) 
                              .limit(limit); 
          
        const response = {
          "totalItems": numOfStaffs,
          "totalPages": Math.ceil(result.length / limit),
          "pageNumber": page,
          "pageSize": result.length,
          "UnivAdmins": result
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).send({
          message: "Error -> Can NOT complete a paging request!",
          error: error.message,
        });
      }
  
}

module.exports.fetchUnivHr = async (req,res)=>{
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
       
        const offset = page ? page * limit : 0;
    
        console.log("offset = " + offset);    
    
        let result = {};
        let numOfStaffs;
        let university = req.params.university
		let role = 'UnivHr'

        
        numOfStaffs = await User.countDocuments({});
        result = await User.find({role:role,university:university},{password: 0,salSecrete:0,__v:0})
                              .populate('university')  
                              .skip(offset) 
                              .limit(limit); 
          
        const response = {
          "totalItems": numOfStaffs,
          "totalPages": Math.ceil(result.length / limit),
          "pageNumber": page,
          "pageSize": result.length,
          "UnivHrs": result
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).send({
          message: "Error -> Can NOT complete a paging request!",
          error: error.message,
        });
      }

}

module.exports.fetchChecker = async (req,res)=>{
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
       
        const offset = page ? page * limit : 0;
    
        console.log("offset = " + offset);    
    
        let result = {};
        let numOfStaffs;
		let role = 'Checker'

        
        numOfStaffs = await User.countDocuments({});
        result = await User.find({role:role},{password: 0,salSecrete:0,__v:0})  
                              .skip(offset) 
                              .limit(limit); 
          
        const response = {
          "totalItems": numOfStaffs,
          "totalPages": Math.ceil(result.length/ limit),
          "pageNumber": page,
          "pageSize": result.length,
          "Checkers": result
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).send({
          message: "Error -> Can NOT complete a paging request!",
          error: error.message,
        });
      }
    
}


module.exports.updateProfile = async(req,res)=>{
    
    // Validate Request
    if(!req.body.firstName && !req.body.middleName && !req.body.lastName && !req.body.email && !req.body.mobile && !req.body.university) {
        return res.status(400).send({
            message: " this contents can not be empty"
        });
    }

    // Find note and update it with the request body
    await User.findByIdAndUpdate(req.params.id, {
        $set:{
            firstName:req.body.firstName,
            middleName:req.body.middleName,
            lastName:req.body.lastName,
            email:req.body.email,
            mobile:req.body.mobile,
            compass:req.body.compass

        }
        
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.status(200).send({
            message:"successfully update the user ",
            success:true
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.id
        });
    });
}

module.exports.UpdateOwnProfile= async(req,res)=>{
    console.log("request sent");
    if(!req.body.email && !req.body.password){
        return res.status(400).send({
                 message:"this content can't be empty"
        });
    }
    
    const salt = await bcrypt.genSaltSync(10);
    const password = await req.body.password;
    
      User.findByIdAndUpdate(req.params.id,{
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


module.exports.activateDeactivate= async(req,res)=>{

    console.log(req.body.isActive);
     const isActive = !req.body.isActive
     console.log(isActive)
     await User.findByIdAndUpdate(req.params.id,{
       $set:{
         isActive:isActive
 
       }  
     }, {new: true})
     .then(user => {
         if(!user) {
             return res.status(404).send({
                 message: "User not found with this " + req.params.id
             });
         }
         res.send({
                message:"Deactivate/Activate Successfully !!"
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

module.exports.deleteChecker= async(req,res)=>{
  await User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        });
    });

}



// fetch university staff
module.exports.fetchUniversityStaff = async(req,res)=>{
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
       
        const offset = page ? page * limit : 0;
    
        console.log("offset = " + offset);    
    
        let result = {};
        let numOfStaffs;
        let university = req.params.university
        let compass = req.params.compass;
        
        numOfStaffs = await Lecture.countDocuments({});
        result = await Lecture.find({university:university,compass:compass},{__v:0,createdAt:0,updatedAt:0})
                              .populate('university')  
                              .skip(offset) 
                              .limit(limit); 
          
        const response = {
          "totalItems": numOfStaffs,
          "totalPages": Math.ceil(numOfStaffs / limit),
          "pageNumber": page,
          "pageSize": result.length,
          "subsubAdmins": result
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).send({
          message: "Error -> Can NOT complete a paging request!",
          error: error.message,
        });
      }
}

module.exports.fetchUniversityStaffAllForUnivHr= async (req, res) => {
    let university = req.params.university
    let compass = req.params.compass;
    Lecture.find({university:university,compass:compass},{__v:0,createdAt:0,updatedAt:0},(err,result)=>{
        if(err){
            res.send(err)

        }else{
            res.send(result)
        }
    }).populate('university')
 }





// university staff update

module.exports.updateUniversityStaffProfile = (req,res)=>{
    
    // Validate Request
    if(!req.body.firstName && !req.body.middleName && !req.body.age && !req.body.lastName && !req.body.email && 
        !req.body.mobile && !req.body.university&& !req.body.professionalTitle && !req.body.role  && 
        !req.body.study && !req.body.educationField && !req.body.department && !req.body.workExperience) {
        return res.status(400).send({
            message: "For University staff this contents can not be empty"
        });
    }

    // Find note and update it with the request body
    Lecture.findByIdAndUpdate(req.params.id, {

        $set:{
            firstName:req.body.firstName,
            middleName:req.body.middleName,
            lastName:req.body.lastName,
            gender:req.body.gender,
            email:req.body.email,
            mobile:req.body.mobile,
            educationStatus:req.body.professionalTitle,
            role:req.body.role,
            study:req.body.study,
            educationField:req.body.educationField,
            department:req.body.department,
            workExperience:req.body.workExperience,
            certificate : req.body.certificate,
            researchArea : req.body.researchArea,
            futureResearchInterest : req.body.futureResearchInterest,
            numberOfPublications : req.body.numberOfPublications,
            homeBase : req.body.homeBase,
            latestEducationDocument:{
                data:req.body.latestEducationDocument,
                contentType:"application/pdf"
            }


        }
        
    }, {new: true})
    .then(lecture => {
        if(!lecture) {
            return res.status(404).send({
                message: "University staff not found with id " + req.params.id
            });
        }
        res.status(200).send({
            message:"successfully update university staff"
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "University staff not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating university staff with id " + req.params.id
        });
    });
}

// delete university staff
module.exports.deleteUniversityStaff=(req,res)=>{  
    //console.log(req.params.filename);
    console.log(__basedir);
    var filepath= path.resolve(__basedir, './uploads/' + req.params.filename);  
    console.log(filepath); 
    Lecture.findByIdAndRemove(req.params.id)
    .then(lecture => {
        if(!lecture) {
            return res.status(404).send({
                message: "University staff not found with id " + req.params.id
            });
        }
        res.send({message: "University staff deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "University staff not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete University staff with id " + req.params.id
        });
    });
    fs.unlinkSync(filepath);

    

} 

// fetch University Staff for Checker
module.exports.fetchUniversityStaffForChecker = async(req,res)=>{
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
       
        const offset = page ? page * limit : 0;
    
        console.log("offset = " + offset);    
    
        let result = {};
        let numOfStaffs;
        
        numOfStaffs = await Lecture.countDocuments({});
        result = await Lecture.find({})
                              .populate('university')  
                              .skip(offset) 
                              .limit(limit); 
          
        const response = {
          "totalItems": numOfStaffs,
          "totalPages": Math.ceil(numOfStaffs / limit),
          "pageNumber": page,
          "pageSize": result.length,
          "subsubAdmins": result
        };
    
        res.status(200).json(response);
      } catch (error) {
        res.status(500).send({
          message: "Error -> Can NOT complete a paging request!",
          error: error.message,
        });
      }
    
}

module.exports.fetchUniversityStaffForPagination = async(req,res)=>{
    try {
        let page = parseInt(req.query.page);
        let limit = parseInt(req.query.size);
       
        const offset = page ? page * limit : 0;
    
        console.log("offset = " + offset);    
    
        let result = {};
        let numOfStaffs;
        
        numOfStaffs = await Lecture.countDocuments({});
        result = await Lecture.find({})
                              .populate('university')  
                              .skip(offset) 
                              .limit(limit); 
          
        const response = {
          "totalItems": numOfStaffs,
          "totalPages": Math.ceil(numOfStaffs / limit),
          "pageNumber": page,
          "pageSize": result.length,
          "subsubAdmins": result
        };
        res.status(200).json(response);
      } catch (error) {
        res.status(500).send({
          message: "Error -> Can NOT complete a paging request!",
          error: error.message,
        });
      }
    
}





// university staff search and match

module.exports.findAndMatchUniversityStaff=(req,res)=>{
    var query = req.params.query;
    var query1 = req.params.query1;
    var query2 = req.params.query2;
    console.log(query + " "+ query1 + " " + query2);
    Lecture.find({
        "$and":[{"firstName":{$regex:query}},{"middleName":{$regex:query1}},{"lastName":{$regex:query2}}]

     }, function(err, result) {
         if (err) throw err;
         if (result) {
             res.json(result)
         } else {
             res.send(JSON.stringify({
                 error : 'Error'
             }))
         }
     }).populate('university');
 
 }

 // export file from excel



// register University

 module.exports.isViewedOrNot= async(req,res)=>{

    console.log(req.body.isViewed);
     const isViewed = !req.body.isViewed
     console.log(isViewed)
     await Lecture.findByIdAndUpdate(req.params.id,{
       $set:{
        isViewed:isViewed
 
       }  
     }, {new: true})
     .then(staff => {
         if(!staff) {
             return res.status(404).send({
                 message: "User not found with this " + req.params.id
             });
         }
         res.send({
                message:"This Staff is checked!!"
         });
     }).catch(err => {
         if(err.kind === 'ObjectId') {
             return res.status(404).send({
                 message: "User not found with this " + req.params.id
             });                
         }
         return res.status(500).send({
             message: "Error viewing user profile with id " + req.params.id
         });
   });
   }


// forgot password
module.exports.forgotPassword = async(req,res)=>{
    if (!req.body.email) {
        return res.status(500).json({ message: 'Email is required' });
        }
        const user = await User.findOne({
            email:req.body.email
        });
        if (!user) {
        return res.status(404).json({ message: 'Email does not exist' });
        }
        var resettoken = new passwordResetToken({ _userId: user._id, resettoken: crypto.randomBytes(16).toString('hex') });
        await resettoken.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
             
         });
        await passwordResetToken.findOne({ _userId: user._id,resettoken: { $ne: resettoken.resettoken }}).deleteOne().catch();
        res.status(200).json({
             message: 'Reset Password successfully.' 
        });
        
          
        var transporter = nodemailer.createTransport({
          service: 'Gmail',
          port: 465,
          auth: {
            user: 'almialmi61621@gmail.com',
            pass: 'cybma12345'
          }
        });
        var mailOptions = {
        to: user.email,
        from: 'almialmi61621@gmail.com',
        subject: 'Lecture FollowUp Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        }
        console.log(resettoken.resettoken);
        console.log(user.email); 
       transporter.sendMail(mailOptions, (error, response) => { 
         if(error){
            console.log(error);
        }else{
            console.log("Message sent: " + response.msg);
        }
       })


}
    
 

module.exports.validateToken = async(req,res)=>{
    if (!req.body.resettoken) {
        return res.status(500).json({ message: 'Token is required' });
        }
        const user = await passwordResetToken.findOne({
            resettoken: req.body.resettoken
        });
        if (!user) {
        return res.status(409) .json({ 
            message: 'Invalid URL' 
        });
        }
        User.findOneAndUpdate({id: user._userId }).then(() => {
            res.status(200).json({ message: 'Token verified successfully.' });
        }).catch((err) => {
        return res.status(500).send({ msg: err.message });
        });

}

module.exports.newPassword= async(req,res)=>{
    passwordResetToken.findOne({ resettoken: req.body.resettoken }, function (err, userToken, next) {
        if (!userToken) {
          return res .status(409) .json({ 
              message: 'Token has expired' 
            });
        }
  
         User.findOne({ _id: userToken._userId
        }, function (err, userEmail, next) {
          if (!userEmail) {
            return res .status(409) .json({ 
                message: 'User does not exist'
             });
          }
          userEmail.password = req.body.newPassword;
          userEmail.save(function (err) {
              if (err) {
                return res.status(400) .json({ 
                    message: 'Password can not reset.' 
                });
              } else {
                userToken.remove();
                return res.status(201).json({ 
                    message: 'Password reset successfully' 
                });
              }
  
            });
       
        });
  
      })
   
}



 


 
