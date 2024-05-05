const express = require('express');
const router = express.Router();


const{signupHandler} = require('../controller/usercontroller')



router.post('/signup', signupHandler);




module.exports = router;