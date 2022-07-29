var express = require('express');
var router = express.Router();
const instrumentsRouter = require('../controller/instruments');


router.get('/', instrumentsRouter.addInstrument);

router.post('/', instrumentsRouter.update);


module.exports = router;
