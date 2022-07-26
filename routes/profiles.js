const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')




// GET /profiles/new (/new)
router.get('/new', profilesCtrl.new);
// POST /profiles/instructor - create functionality
router.post('/instructors', profilesCtrl.create);
// POST /profiles/student - create functionality
router.post('/students', profilesCtrl.create);


module.exports = router;