process.env.NODE_ENV ='test';
//var base = process.env.PWD;
var mongoose = require('mongoose'),
    User = require('../../models/user.models'),
    Lecture = require('../../models/lecture.models'),
    University=require('../../models/university.models'),
    passwordResetToken=require('../../models/passwordResetToken.models'),
    server = require('../register.controllers'),
    server2 = require('../user.controller'),
    should = require('should'),
    testUtils=require('../../test/utils');

describe("SuperAdmin Post API",function(){
    var dummyPost,id;
    before(function(done){
        mongoose.connect("mongodb://localhost:27017/LectureFollowUpForTest",{
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify:false
          },(err)=>{
            if(!err) {
                console.log('MongoDB connection succeeded');
                done();
            }
            else{console.log('Error in mongoDB Connection:' +JSON.stringify(err,undefined,2));}
        });

        dummyPost = new User({
            'firstName':'Almaz',
            'middleName':'Tilahun',
            'lastName':'Guadie',
            'email':'almi11@gmail.com',
            'mobile':0910114567,
            'password':'0987654321',
            'role':'SuperAdmin'

        });
        dummyPost.save(function(err,post){
            if(err){
                console.log(err);
            }
            id=post._id;
        });

        dummyPostForUniv = new University({
            'name':'Addis Ababa University',
            'location':'Addis Ababa',
            'email':'addis@gmail.com',
            'poBox':455,
            'fax':'0987654321'

        });
        dummyPostForUniv.save(function(err,post){
            if(err){
                console.log(err);
            }
            id=post._id;
        });


        dummyPostForLecture = new Lecture({
            'firstName':'Enatu',
            'middleName':'Til',
            'lastName':'Gua',
            'email':'enatu@gmail.com',
            'gender':'female',
            'mobile':0910114567,
            'university':'5fc34fe7fca46f0a6006caa0',
            'compass':'5 kilo',
            'professionalTitle':'Degree',
            'role':'Lecture',
            'study':'Natural',
            'educationField':'Engineering',
            'department':'Mechanical',
            'workExperience':0,
            'certificate':"some thing",
            'researchArea':"some where",
            'futureResearchInterest':"i will have",
            'numberOfPublications':0,
            'homeBase':"i have"
        });
        dummyPostForLecture.save(function(err,post){
            if(err){
                console.log(err);
            }
            id=post._id;
        });

    });

    describe("Create SuperAdmin",function(){
        it("should create new Super Admin",function(done){
            var req = {
                body:{
                    'firstName':'Almi',
                    'middleName':'Til',
                    'lastName':'Gua',
                    'email':'almi@gmail.com',
                    'mobile':0910114567,
                    'password':'0987654321',
                    'role':'SuperAdmin',
                
                }

            };
            var res = testUtils.responseValidator(201,function(user){
                user.should.have.property('_id');
                user.should.have.property('isActive');
                user.should.have.property('firstName');
                user.should.have.property('middleName');
                user.should.have.property('lastName');
                user.should.have.property('email');
                user.should.have.property('mobile');
                user.should.have.property('password');
                user.should.have.property('role');
                user.should.have.property('createdAt');
                user.should.have.property('updatedAt');
                user.should.have.property('salSecrete');
                done();
            });

            server.superAdminRegister(req,res);


        });
    })

    describe("Create University Admin",function(){
        it("should create new University Admin",function(done){
            var req = {
                body:{
                    'firstName':'Kiddy',
                    'middleName':'Genetu',
                    'lastName':'New',
                    'email':'kiddy@gmail.com',
                    'mobile':0910114567,
                    'university':'5fc34fe7fca46f0a6006caa0',
                    'password':'0987654321',
                    'role':'UnivAdmin',
                
                }

            };
            var res = testUtils.responseValidator(201,function(user){
                user.should.have.property('_id');
                user.should.have.property('isActive');
                user.should.have.property('firstName');
                user.should.have.property('middleName');
                user.should.have.property('lastName');
                user.should.have.property('email');
                user.should.have.property('mobile');
                user.should.have.property('university');
                user.should.have.property('password');
                user.should.have.property('role');
                user.should.have.property('createdAt');
                user.should.have.property('updatedAt');
                user.should.have.property('salSecrete');
                done();
            });

            server.universityAdminRegister(req,res);


        });
    })
    describe("Create University Hr",function(){
        it("should create new University Hr",function(done){
            var req = {
                body:{
                    'firstName':'Kasu',
                    'middleName':'Wele',
                    'lastName':'Alemu',
                    'email':'kasu@gmail.com',
                    'mobile':0910114567,
                    'university':'5fc34fe7fca46f0a6006caa0',
                    'compass':'5 kilo',
                    'password':'0987654321',
                    'role':'UnivHr',
                
                }

            };
            var res = testUtils.responseValidator(201,function(user){
                user.should.have.property('_id');
                user.should.have.property('isActive');
                user.should.have.property('firstName');
                user.should.have.property('middleName');
                user.should.have.property('lastName');
                user.should.have.property('email');
                user.should.have.property('mobile');
                user.should.have.property('university');
                user.should.have.property('compass');
                user.should.have.property('password');
                user.should.have.property('role');
                user.should.have.property('createdAt');
                user.should.have.property('updatedAt');
                user.should.have.property('salSecrete');
                done();
            });

            server.univHrRegister(req,res);


        });
    })

    describe("Create Checker",function(){
        it("should create new Checker",function(done){
            var req = {
                body:{
                    'firstName':'Emuti',
                    'middleName':'Kassh',
                    'lastName':'Gelaw',
                    'email':'emutu@gmail.com',
                    'mobile':0910114567,
                    'password':'0987654321',
                    'role':'Checker',
                
                }

            };
            var res = testUtils.responseValidator(201,function(user){
                user.should.have.property('_id');
                user.should.have.property('isActive');
                user.should.have.property('firstName');
                user.should.have.property('middleName');
                user.should.have.property('lastName');
                user.should.have.property('email');
                user.should.have.property('mobile');
                user.should.have.property('password');
                user.should.have.property('role');
                user.should.have.property('createdAt');
                user.should.have.property('updatedAt');
                user.should.have.property('salSecrete');
                done();
            });

            server.checkerRegister(req,res);


        });
    })

    describe("Create University",function(){
        it("should create new University",function(done){
            var req = {
                body:{
                    'name':'Harameya University',
                    'location':'Harer',
                    'email':'haramya@gmail.com',
                    'poBox':555,
                    'fax':'251-11-122-9480'
                
                }

            };
            var res = testUtils.responseValidator(201,function(user){
                user.should.have.property('_id');
                user.should.have.property('name');
                user.should.have.property('location');
                user.should.have.property('email');
                user.should.have.property('poBox');
                user.should.have.property('fax');
                done();
            });

            server.registerUniversity(req,res);


        });
    })

    describe("Create University Staff",function(){
        it("should create new University staff",function(done){
            var req = {
                body:{
                    'firstName':'kal',
                    'middleName':'kassh',
                    'lastName':'Gelaw',
                    'email':'kal@gmail.com',
                    'gender':'male',
                    'mobile':0910114567,
                    'university':'5fc34fe7fca46f0a6006caa0',
                    'compass':'5 kilo',
                    'professionalTitle':'Degree',
                    'role':'Lecture',
                    'study':'Natural',
                    'educationField':'Engineering',
                    'department':'Mechanical',
                    'workExperience':0,
                    'certificate':"hello i have",
                    'researchArea':" yes in the future",
                    'futureResearchInterest':"yes i will have",
                    'numberOfPublications':0,
                    'homeBase':"ofcourse",
                    'latestEducationDocument.data':'file-1614173670335-MonthlyReportCompiled-for Ellen.pdf',
                    'latestEducationDocument.contentType':'application/pdf'
                    
                
                }

            };
            var res = testUtils.responseValidator(201,function(user){
                user.should.have.property('_id');
                user.should.have.property('isViewed');
                user.should.have.property('firstName');
                user.should.have.property('middleName');
                user.should.have.property('lastName');
                user.should.have.property('email');
                user.should.have.property('gender');
                user.should.have.property('mobile');
                user.should.have.property('university');
                user.should.have.property('compass');
                user.should.have.property('professionalTitle');
                user.should.have.property('role');
                user.should.have.property('study');
                user.should.have.property('educationField');
                user.should.have.property('department');
                user.should.have.property('workExperience');
                user.should.have.property('certificate');
                user.should.have.property('researchArea');
                user.should.have.property('futureResearchInterest');
                user.should.have.property('numberOfPublications');
                user.should.have.property('homeBase');
                user.should.have.property('latestEducationDocument.data');
                user.should.have.property('latestEducationDocument.contentType');
                user.should.have.property('createdAt');
                user.should.have.property('updatedAt');
                user.should.have.property('salSecrete');
                done();
            });

            server.lectureRegister(req,res);


        });
    })




});

    

