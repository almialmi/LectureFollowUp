const mongoose = require('mongoose');
const Checker = mongoose.model('Checker');
const Subsub = mongoose.model('Subsub');
const Lecture = mongoose.model('Lecture');
const passport = require('passport');
const bcrypt = require('bcryptjs');

module.exports.register = (req,res,next) =>{
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
module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('checkerLocal',(err,user,info)=>{
        if(err) return res.status(400).json(err);
        else if(user) return res.status(200).json({'token':user.generetJwt()});
        else return res.status(404).json(info);

    })(req,res);
}
module.exports.login=(req,res,next)=>{
  Checker.findOne({'email':req.body.email},(err,checker)=>{
      if(!checker) res.json({message:'Login failed,Checker not found '});
      checker.comparePassword(req.body.password,(err,isMatch)=>{
            if(err) throw err;
            if(!isMatch) return res.status(400).json({
                message:'Wrong Password'
            });
            res.status(200).send('Logged in successfully');
      });
  });
}

//fetch lectures and department heads

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

module.exports.fetchLectures = (req,res,next)=>{
    Lecture.find((err,result)=>{
          if(err){
              res.send(err);
        }
          else{
              res.send(result);
          }
    });
}

module.exports.findSubsub=(req,res)=>{
    var query = req.params.query;
    var query1 = req.params.query1;
    var query2 = req.params.query2;
    console.log(query + " "+ query1 + " " + query2);
    Subsub.find({
        "$and":[{"firstName":{$regex:query}},{"middleName":{$regex:query1}},{"lastName":{$regex:query2}}]
       /**  $text: {
            $search: query
        }*/
        
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

// search by fullName

module.exports.findLecture=(req,res)=>{
   var query = req.params.query;
   var query1 = req.params.query1;
   var query2 = req.params.query2;
   console.log(query + " "+ query1 + " " + query2);
   Lecture.find({
       "$and":[{"firstName":{$regex:query}},{"middleName":{$regex:query1}},{"lastName":{$regex:query2}}]
        /**  $text: {
            $search: query + " "+ query1 + " " + query2
        } */
        
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
module.exports.UpdateProfile= async(req,res)=>{
    console.log("request sent");
    if(!req.body.email && !req.body.password){
        return res.status(400).send({
                 message:"this content can't be empty"
        });
    }
    
    const salt = await bcrypt.genSaltSync(10);
    const password = await req.body.password;
    
    Checker.findByIdAndUpdate(req.params.id,{
        email:req.body.email,
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


