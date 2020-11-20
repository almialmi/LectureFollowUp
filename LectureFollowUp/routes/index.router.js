const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
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

// register university

router.post('/registerUniversity',ctrlUser.registerUniversity);

router.get('/fetchUniversity' ,ctrlUser.fetchUniversity);


//fetch by role

router.get('/fetchUnivAdmin',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUnivAdmin);

router.get('/fetchUnivHr/:university',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUnivHr);

router.get('/fetchChecker',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchChecker);




// update user

router.put('/updateProfile/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.updateProfile);

//update own account

router.put('/updateOwnProfile/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.UpdateOwnProfile);

//Account lock/unlock
 router.put('/ActivateDeactivate/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.activateDeactivate);


// delete checker

router.delete('/deleteChecker/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.deleteChecker);


// register university staff by univHr

router.post('/registerUniversityStaff',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.universityStaffRegister);

// export from excel and register
router.post('/uploadFile',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.uploadFileAndRegisterUniversityStaff);

// fetch university staff by hr 
//fetch university staff

router.get('/fetchUniversityStaff/:university/:compass',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUniversityStaff);

// update university staff

router.put('/updateUniversityStaffProfile/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.updateUniversityStaffProfile);

// delete university staff
router.delete('/deleteUniversityStaff/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.deleteUniversityStaff);

// fetch university staff by checker
router.get('/fetchUniversityStaffByChecker',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUniversityStaffForChecker);

// search university staff by checker
router.get('/findAndMatchUniversityStaff/:query/:query1/:query2',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.findAndMatchUniversityStaff);

router.put('/isViewedOrNot/:id',ctrlUser.isViewedOrNot);


module.exports=router;