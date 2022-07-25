var express = require('express');
var router = express.Router();
var accountsCtrl = require('../controller/accounts')


// GET /accounts/new (/new)
router.get('/new', accountsCtrl.new);

module.exports = router;