var express = require('express');
var router = express.Router();
const instrumentsCtrl = require('../controller/instruments');

router.get('/', instrumentsCtrl.addInstrument);

router.post('/', instrumentsCtrl.update);

module.exports = router;
