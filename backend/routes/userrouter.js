const express = require('express');
const router = express.Router();


const{signupHandler,loginHandler, google} = require('../controller/usercontroller')



router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.post('/google', google);




module.exports = router;