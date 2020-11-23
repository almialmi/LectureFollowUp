const mongoose = require('mongoose');
const Lecture = mongoose.model('Lecture');
const User = mongoose.model('User');


module.exports.lectureRegister = (req,res,next)=>{
    var lecture = new Lecture();
    lecture.firstName =req.body.firstName;
    lecture.middleName = req.body.middleName;
    lecture.lastName = req.body.lastName;
    lecture.email = req.body.email;
    lecture.mobile = req.body.mobile;
    lecture.university = req.body.university;
    lecture.compass=req.body.compass;
    lecture.educationStatus = req.body.educationStatus;
    lecture.role = req.body.role;
    lecture.study = req.body.study;
    lecture.field = req.body.field;
    lecture.department = req.body.department;

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
module.exports.superAdminRegister = (req,res,next)=>{
    var user = new User({
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile:req.body.mobile,
        password:req.body.password,
        role:"SuperAdmin"


    });
    
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

module.exports.universityAdminRegister = (req,res,next)=>{
    var user = new User({
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile:req.body.mobile,
        university:req.body.university,
        password:req.body.password,
        role:"UnivAdmin"


    });
    
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


module.exports.checkerRegister = (req,res,next)=>{
    var user = new User({
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile:req.body.mobile,
        password:req.body.password,
        role:"Checker"


    });
    
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

module.exports.univHrRegister = (req,res,next)=>{
    var user = new User({
        firstName:req.body.firstName,
        middleName:req.body.middleName,
        lastName:req.body.lastName,
        email:req.body.email,
        mobile:req.body.mobile,
        university:req.body.university,
        compass:req.body.compass,
        password:req.body.password,
        role:"UnivHr"


    });
    
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