const mongoose = require('mongoose');
const Sub= mongoose.model('Sub');
const Subsub = mongoose.model('Subsub');
const passport = require('passport');

module.exports.login=(req,res,next)=>{
    Sub.findOne({'email':req.body.email},(err,sub)=>{
        if(!sub) res.json({message:'Login failed,user not found '});
        sub.comparePassword(req.body.password,(err,isMatch)=>{
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
    passport.authenticate('subLocal' , (err , user , info) => {
        //error from passport middle ware
        if (err) return res.status(400).json(err);

        //registerd user
        else if(user) return res.status(200).json({"token" : user.generateJwt()});
        //unkown user or wrong password
        else 
        return res.status(404).json(info);
    })(req , res);
}

module.exports.subsubAdminRegister = (req,res,next)=>{
    var subsubAdmin = new Subsub();
    subsubAdmin.firstName =req.body.firstName;
    subsubAdmin.middleName = req.body.middleName;
    subsubAdmin.lastName = req.body.lastName;
    subsubAdmin.email = req.body.email;
    subsubAdmin.mobile = req.body.mobile;
    subsubAdmin.university = req.body.university;
    subsubAdmin.educationStatus = req.body.educationStatus;
    subsubAdmin.role = req.body.role;
    subsubAdmin.study = req.body.study;
    subsubAdmin.educationField = req.body.educationField;
    subsubAdmin.department = req.body.department;
    subsubAdmin.password=req.body.password;
    subsubAdmin.save((err,doc)=>{
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

module.exports.fetchSubsubAdmin = (req,res,next)=>{
    Subsub.find((err,result)=>{
          if(err){
              res.send(err);
        }
          else{
              res.send(result);
          }
    });
}
// find by id
module.exports.findOne =(req,res)=>{
    Subsub.findById(req.params.id)
    .then(subsub => {
        if(!subsub) {
            return res.status(404).send({
                message: "Sub sub Admin not found with id " + req.params.id
            });            
        }
        res.send(subsub);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sub sub Admins not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Sub sub Admins with id " + req.params.id
        });
    });

}
//find by name
module.exports.findByName=(req,res)=>{
    var query = req.params.query;
    Subsub.find({
        
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
    if(!req.body.firstName && !req.body.middleName && !req.body.lastName && !req.body.email && 
        !req.body.mobile && !req.body.university&& !req.body.educationStatus && !req.body.role  && 
        !req.body.study && !req.body.educationField && !req.body.department &&!req.body.password) {
        return res.status(400).send({
            message: "For Sub sub Admin this contents can not be empty"
        });
    }

    // Find note and update it with the request body
    Subsub.findByIdAndUpdate(req.params.id, {
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
    .then(subsub => {
        if(!subsub) {
            return res.status(404).send({
                message: "Sub sub Admin not found with id " + req.params.id
            });
        }
        res.send(subsub);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sub sub Admin not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating Sub sub Admin with id " + req.params.id
        });
    });
}

module.exports.delete=(req,res)=>{
    Subsub.findByIdAndRemove(req.params.id)
    .then(subsub => {
        if(!subsub) {
            return res.status(404).send({
                message: "Sub sub Admin not found with id " + req.params.id
            });
        }
        res.send({message: "Sub sub Admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Sub sub Admin not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Sub sub Admin with id " + req.params.id
        });
    });

}
