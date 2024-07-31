const express = require('express');
const { createListing, deleteListing, updateListing } = require('../controller/listing.controller');
const { checkAuthentication } = require('../middleware/verifyUser');
const router = express.Router();


router.post('/create',checkAuthentication, createListing)

router.delete('/delete/:id', checkAuthentication, deleteListing);
router.post('/update/:id', checkAuthentication, updateListing);















module.exports = router