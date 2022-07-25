const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')


// GET /profiles/new (/new)
router.get('/new', profilesCtrl.new);

module.exports = router;