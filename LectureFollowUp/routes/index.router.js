const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

//for login
router.post('/register',ctrlUser.register);
router.post('/login',ctrlUser.login);
router.post('/autenticate' , ctrlUser.autenticate);

//register Checker
router.post('/registerChecker',jwtHelper.verifyJwtToken,ctrlUser.registerChecker,);
router.get('/registeredChecker',jwtHelper.verifyJwtToken,ctrlUser.fetchChecker);


//for register subAdmins
router.post('/subAdminRegister',jwtHelper.verifyJwtToken, ctrlUser.subAdminRegister);
router.get('/subAdminRegister',jwtHelper.verifyJwtToken,ctrlUser.fetchSubAdmin);
router.get('/userProfile' ,jwtHelper.verifyJwtToken,ctrlUser.userProfile );

// Retrieve a single Admin with adminId
//router.get('/subAdmin/:id', ctrlUser.findOne);
router.put('/CheckerUpdate/:id',jwtHelper.verifyJwtToken,ctrlUser.CheckerUpdate);

//delete checker
router.delete('/CheckerDelete/:id',ctrlUser.CheckerDelete);

// find by name 
router.get('/subAdmin/:query',ctrlUser.findByName);

// Update a Note with noteId
router.put('/subAdmin/:id',jwtHelper.verifyJwtToken, ctrlUser.update);

// Delete a Note with noteId
router.delete('/subAdmin/:id',jwtHelper.verifyJwtToken, ctrlUser.delete);



module.exports=router;