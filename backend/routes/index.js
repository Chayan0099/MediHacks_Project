const express = require('express'); 
const router = express.Router(); 
const ptRouter = require('./patient'); //patient for patient side login
const adminRouter = require('./admin');  //admin for hospital admisnistration side login
const cors = require('cors'); 

router.use(cors()); 
router.use('/patient', ptRouter); 
router.use('/admin', adminRouter); 

module.exports = router; 