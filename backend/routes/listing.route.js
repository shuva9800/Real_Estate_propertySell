const express = require('express');
const { createListing } = require('../controller/listing.controller');
const { checkAuthentication } = require('../middleware/verifyUser');
const router = express.Router();


router.post('/create',checkAuthentication, createListing)

















module.exports = router