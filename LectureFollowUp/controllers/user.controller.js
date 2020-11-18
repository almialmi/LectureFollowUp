const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const Lecture=mongoose.model('Lecture');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//upload file from excel

const fs = require('fs');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');


const userRegister = async(userDets,role,res) =>{
   try{
    let emailNotRegistered = await validateEmail(userDets.email);

    if(!emailNotRegistered){
        return res.status(400).json({
            message:'Email already registered',
            success:false

        });

    }
    const newUser = new User({
        ...userDets,
        role
    });
    await newUser.save();
    return res.status(201).json({
        message:'successfully register.Now Login',
        success:true
    })

   }catch(err){
    return res.status(500).json({
        message:'Unable to create account',
        success:false
    })

   }


}

const fetchUser = async(role,res)=>{
    User.find({role:role},{password: 0,salSecrete:0,__v:0},(err,result)=>{
        if(err){
            res.send(err)

        }else{
            res.send(result)
        }
    })

}

const validateEmail = async email =>{
    let user = await User.findOne({email});
    return user ? false:true
}

module.exports.registerSuperAdmin = async(req,res) =>{
    await userRegister(req.body,"SuperAdmin",res);
}

module.exports.registerUnivAdmin = async(req,res)=>{
    await userRegister(req.body,"UnivAdmin",res);

}

module.exports.registerUnivHr = async(req,res)=>{
    await userRegister(req.body,"UnivHr",res);
    
}

module.exports.registerChecker = async(req,res)=>{
    await userRegister(req.body,"Checker",res);
    
}

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
                email:user.email},
            process.env.JWT_SECRET,
          { expiresIn :process.env.JWT_EXP });
          let result ={
              token:`Bearer ${token}`
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

module.exports.Authenticate = passport.authenticate("jwt",{session:false})

module.exports.fetchUnivAdmin = async (req,res)=>{
    await fetchUser('UnivAdmin',res);
  
}

module.exports.fetchUnivHr = async (req,res)=>{
    await fetchUser('UnivHr',res);

}

module.exports.fetchChecker = async (req,res)=>{
    await fetchUser('Checker',res);
    

}

module.exports.updateProfile = async(req,res)=>{
    
    // Validate Request
    if(!req.body.firstName && !req.body.middleName && !req.body.lastName && !req.body.email && !req.body.mobile && !req.body.university) {
        return res.status(400).send({
            message: " this contents can not be empty"
        });
    }
    const salt = await bcrypt.genSaltSync(10);
    const password = await req.body.password;

    // Find note and update it with the request body
    await User.findByIdAndUpdate(req.params.id, {
        $set:{
            firstName:req.body.firstName,
            middleName:req.body.middleName,
            lastName:req.body.lastName,
            email:req.body.email,
            mobile:req.body.mobile,
            university:req.body.university,
           // password:bcrypt.hashSync(password, salt)

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


// university staff register
const lectureRegister = async(userDets,res) =>{
    try{
     let emailNotRegistered = await validateLectureEmail(userDets.email);
 
     if(!emailNotRegistered){
         return res.status(400).json({
             message:'Email already registered',
             success:false
 
         });
 
     }
     const newLecture = new Lecture({
         ...userDets
     });
     await newLecture.save();
     return res.status(201).json({
         message:'successfully register University staff.',
         success:true
     })
 
    }catch(err){
     return res.status(500).json({
         message:'Unable to create account',
         success:false
     })
 
    }
 
 
 }

 const validateLectureEmail = async email =>{
    let staff = await Lecture.findOne({email});
    return staff ? false:true
}

module.exports.universityStaffRegister = async (req,res)=>{
    await lectureRegister(req.body,res);
}

// fetch university staff

module.exports.fetchUniversityStaff = (req,res)=>{
    Lecture.find({password: 0,salSecrete:0,__v:0},(err,result)=>{
          if(err){
              res.send(err);
        }
          else{
              res.send(result);
          }
    });
}

// university staff update

module.exports.updateUniversityStaffProfile = (req,res)=>{
    
    // Validate Request
    if(!req.body.firstName && !req.body.middleName && !req.body.lastName && !req.body.email && 
        !req.body.mobile && !req.body.university&& !req.body.educationStatus && !req.body.role  && 
        !req.body.study && !req.body.educationField && !req.body.department) {
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
            email:req.body.email,
            mobile:req.body.mobile,
            university:req.body.university,
            educationStatus:req.body.educationStatus,
            role:req.body.role,
            study:req.body.study,
            educationField:req.body.educationField,
            department:req.body.department

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

} 


// university staff search and match

module.exports.findAndMatchUniversityStaff=(req,res)=>{
    var query = req.params.query;
    var query1 = req.params.query1;
    var query2 = req.params.query2;
    console.log(query + " "+ query1 + " " + query2);
    Lecture.find({salSecrete:0,__v:0},{
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
     })
 
 }

 // export file from excel

global.__basedir = __dirname;

// -> Multer Upload Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + '/uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
    }
});
const upload = multer({storage: storage,
               fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }}).single("uploadfile");
 
// -> Express Upload RestAPIs
module.exports.uploadFileAndRegisterUniversityStaff= async (req, res) =>{
    
   await upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file.");
        } else {
        importExcelData2MongoDB(__basedir + '/uploads/' + req.file.filename);
          return  res.json({
             'msg': 'File uploaded/import successfully!', 'file': req.file
            });
            
        }
      });
}
 
// -> Import Excel File to MongoDB database
const importExcelData2MongoDB= (filePath)=>{
    const excelData = excelToJson({
        sourceFile: filePath,
        sheets:[{
            name: 'UniversityStaff',
            header:{
               rows: 1
            },
            columnToKey: {
                A:'firstName',
                B:'middleName',
                C:'lastName',
                D:'email',
                E:'mobile',
                F:'university',
                G:'educationStatus',
                H:'role',
                I:'study',
                J:'educationField',
                K:'department'
            }
        }]
    });
    console.log(excelData);
 
    Lecture.insertMany(excelData.UniversityStaff, (err, res) => {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
    });

    
 
			
    fs.unlinkSync(filePath);
} 

 
