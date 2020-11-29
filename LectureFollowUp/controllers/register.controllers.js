const mongoose = require('mongoose');
const Lecture = mongoose.model('Lecture');
const User = mongoose.model('User');
const University = mongoose.model('University')



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
            if(err)
                res.status(422).send("hello something wrong!!!");
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

module.exports.registerUniversity = async (req, res) => {
    var univ = new University({
        name:req.body.name,
        location:req.body.location,
        Pox:req.body.Pox,
        email:req.body.email
    });
    
    univ.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else{
            if(err.code  == 11000)
                res.status(422).send(['Duplicate university email address found.']);
            else
                return next(err);    
        }
            
    });
    
 }

 module.exports.updateUniversity =(req,res)=>{
    if(!req.body.name && !req.body.location && !req.body.Pox && !req.body.email) {
        return res.status(400).send({
            message: " this contents can not be empty"
        });
    }
    // Find note and update it with the request body
     University.findByIdAndUpdate(req.params.id, {
        $set:{
            name:req.body.name,
            location:req.body,location,
            Pox:req.body.Pox,
            email:req.body.email
        }
        
    }, {new: true})
    .then(univ => {
        if(!univ) {
            return res.status(404).send({
                message: "University not found with id " + req.params.id
            });
        }
        res.status(200).send({
            message:"successfully update the University ",
            success:true
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "University not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating University with id " + req.params.id
        });
    });
 }


 module.exports.fetchUniversity= async (req, res) => {
    University.find({__v:0},(err,result)=>{
        if(err){
            res.send(err)

        }else{
            res.send(result)
        }
    })
 }
// fetch duplicated staffs

module.exports.fetchDuplicatedUniversityStaff =(req,res)=>{
    Lecture.aggregate([
         { $group: {
            _id: { firstName: "$firstName", middleName: "$middleName" ,lastName:"$lastName" },
            University: { $addToSet: "$university"},
            COUNTER: { $sum: 1 }
         } },
         { $match: {
            COUNTER: { $gte: 2 }
         } },
         { $sort : { COUNTER : -1} }
      ],function (err, result) {
        if (result) {
            res.json(result)
        }else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
})
}