const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')


// GET /landing/new (/new)
router.get('/new', profilesCtrl.new);