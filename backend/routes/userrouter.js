const express = require('express');
const router = express.Router();


const{signupHandler,loginHandler, google} = require('../controller/usercontroller');
const {updateUser} = require('../controller/profilecontroller')



router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.post('/google', google);
router.post('/updateprofile/:id',updateUser)




module.exports = router;