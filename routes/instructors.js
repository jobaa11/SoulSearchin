const express = require('express');
const router = express.Router();
const instructorsCtrl = require('../controller/instructors')

// All routes start with /instructors 

router.get('/', instructorsCtrl.index);

module.exports = router;