const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')




// GET /profiles/new (/new)
router.get('/new', profilesCtrl.new);
// POST /profiles/instructor - create functionality
router.get('/instructors', profilesCtrl.show);
// // POST /profiles/student - create functionality
// router.post('/students', profilesCtrl.create);


module.exports = router;