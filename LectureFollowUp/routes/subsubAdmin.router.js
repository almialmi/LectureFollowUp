const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');

const subsubUser = require('../controllers/subsubAdmin.controllers');

//login
router.post('/login',subsubUser.login);
router.post('/autenticate' , subsubUser.autenticate);

//register lectures

router.post('/registerLecture',jwtHelper.verifyJwtToken,subsubUser.lectureRegister);


//fetch lectures

router.get('/registerLecture',jwtHelper.verifyJwtToken,subsubUser.fetchlectures);

// Retrieve a single Admin with adminId
//router.get('/lecture/:id', jwtHelper.verifyJwtToken,subsubUser.findOne);

// search lecture by name
router.get('/lecture/:query',jwtHelper.verifyJwtToken,subsubUser.findByName);

// Update a Lecture with lectureId
router.put('/lecture/:id',jwtHelper.verifyJwtToken ,subsubUser.update);

// Delete a Lecture with lectureId
router.delete('/lecture/:id', jwtHelper.verifyJwtToken,subsubUser.delete);

//updateProfile
router.put('/updateProfile/:id',subsubUser.UpdateProfile);

//selective update profile
router.put('/selectiveUpdateProfile/:id',subsubUser.selectiveUpdateProfile);




module.exports=router;