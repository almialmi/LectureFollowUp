const express = require('express');
const router = express.Router();

const checkerUser = require('../controllers/checker.controllers');
const jwtHelper = require('../config/jwtHelper');

//for login
router.post('/register',checkerUser.register);
router.post('/authenticate',checkerUser.authenticate);

//fetch lectures and department heads
router.get('/registerdSubsubAdmins',jwtHelper.verifyJwtToken,checkerUser.fetchSubsubAdmin);
router.get('/registeredLectures',jwtHelper.verifyJwtToken, checkerUser.fetchLectures);


// search by firstName or find by query for subsubAdmin
router.get('/findSubsub/:query/:query1/:query2',jwtHelper.verifyJwtToken,checkerUser.findSubsub);

// search by firstName for Lectures
router.get('/findLecture/:query/:query1/:query2',checkerUser.findLecture);

// update profile
router.put('/updateProfile/:id',jwtHelper.verifyJwtToken,checkerUser.UpdateProfile);



module.exports=router;