const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');

const subUser = require('../controllers/subAdmin.controllers');

//login
router.post('/login',subUser.login);
router.post('/autenticate' , subUser.autenticate);

//register subsubAdmins
router.post('/registersubsubAdmin',jwtHelper.verifyJwtToken,subUser.subsubAdminRegister);

//fetch subsubAdmins
router.get('/registersubsubAdmin',jwtHelper.verifyJwtToken,subUser.fetchSubsubAdmin);

// Retrieve a single Admin with adminId
router.get('/subSubAdmin/:id',jwtHelper.verifyJwtToken ,subUser.findOne);

// find by name
router.get('/subSubAdmin/:query',jwtHelper.verifyJwtToken,subUser.findByName);

// Update a subSubAdmin with subSubAdminId
router.put('/subSuAdmin/:id', jwtHelper.verifyJwtToken,subUser.update);

// update profile
router.put('/updateProfile/:id',jwtHelper.verifyJwtToken,subUser.UpdateProfile);

//selective update
router.put('/selectiveUpdateProfile/:id',subUser.selectiveUpdateProfile);

// Delete a subSubAdmin with subSubAdminId
router.delete('/subSubAdmin/:id',jwtHelper.verifyJwtToken ,subUser.delete);

// activate deactivate sub sub admin
router.put('/activateDeactivateSubsub/:id',subUser.activateDeactivateSubsub);




module.exports=router;