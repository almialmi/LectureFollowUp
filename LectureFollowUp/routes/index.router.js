const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const ctrUpload = require('../controllers/uploadfile.controller');
const jwtHelper = require('../config/jwtHelper');

// register for route super Admin
router.post('/register-super-admin',ctrlUser.registerSuperAdmin);

// register for univAdmin
router.post('/register-univ-admin',ctrlUser.registerUnivAdmin);

// register for univHr
router.post('/register-univ-hr',ctrlUser.registerUnivHr);

// register for Checker

router.post('/register-checker',ctrlUser.registerChecker);

// login route for all user

router.post('/login',ctrlUser.login);


//fetch by role

router.get('/fetchUnivAdmin',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUnivAdmin);

router.get('/fetchUnivHr',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUnivHr);

router.get('/fetchChecker',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchChecker);


// update user

router.put('/updateProfile/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.updateProfile);

//update own account

router.put('/updateOwnProfile/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.UpdateOwnProfile);

//Account lock/unlock
 router.put('/ActivateDeactivate/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.activateDeactivate);


// delete checker

router.delete('/delete/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.deleteChecker);


// register university staff

router.post('/registerUniversityStaff',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.universityStaffRegister);

// export from excel and register
router.post('/uploadFile',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.uploadFileAndRegisterUniversityStaff);

router.post('/uploadExcel',ctrUpload.uploadExcel);

//fetch university staff

router.get('/fetchUniversityStaff',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUniversityStaff);

// update university staff

router.put('/updateUniversityStaffProfile/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.updateUniversityStaffProfile);

// delete university staff
router.delete('/deleteUniversityStaff/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.deleteUniversityStaff);


// search university staff
router.get('/findAndMatchUniversityStaff/:query/:query1/:query2',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.findAndMatchUniversityStaff);


module.exports=router;