const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const regUser= require('../controllers/register.controllers');
const jwtHelper = require('../config/jwtHelper');


// register staff
router.post('/registerLectures',jwtHelper.verifyJwtToken,regUser.lectureRegister);

// register for univAdmin
router.post('/registerUnivAdmin',jwtHelper.verifyJwtToken,regUser.universityAdminRegister);


// register for Checker
router.post('/checkerRegister',jwtHelper.verifyJwtToken,regUser.checkerRegister);


// register for univHr
router.post('/univHrRegister',jwtHelper.verifyJwtToken,regUser.univHrRegister);

// register for route super Admin
router.post('/superAdminRegister',jwtHelper.verifyJwtToken,regUser.superAdminRegister);





// login route for all user

router.post('/login',ctrlUser.login);

// register university

router.post('/registerUniversity',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,regUser.registerUniversity);

router.get('/fetchUniversity' ,ctrlUser.Authenticate,jwtHelper.verifyJwtToken,regUser.fetchUniversity);

router.put('/updateUniversity/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,regUser.updateUniversity);


//fetch by role

router.get('/fetchUnivAdmin',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUnivAdmin);

router.get('/fetchUnivHr/:university',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchUnivHr);

router.get('/fetchChecker',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.fetchChecker);

router.get('/fetchDuplicatedUniversityStaff',regUser.fetchDuplicatedUniversityStaff);




// update user

router.put('/updateProfile/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.updateProfile);

//update own account

router.put('/updateOwnProfile/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.UpdateOwnProfile);

//Account lock/unlock
 router.put('/ActivateDeactivate/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.activateDeactivate);


// delete checker

router.delete('/deleteChecker/:id',ctrlUser.Authenticate,jwtHelper.verifyJwtToken,ctrlUser.deleteChecker);


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

// forgot password
router.post('/req-reset-password',ctrlUser.forgotPassword);
router.post('/valid-password-token',ctrlUser.validateToken);
router.post('/new-password',ctrlUser.newPassword);


module.exports=router;