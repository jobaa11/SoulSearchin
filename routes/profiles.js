const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')




router.get('/instructors/', profilesCtrl.index)
// GET /profiles/new/instructor 
router.get('/new/instructor', profilesCtrl.newInstructor)
// GET /profiles/new/student 
router.get('/new/student', profilesCtrl.newStudent)
// GET /profiles/instructor - create functionality
// POST /profiles/instructor - create functionality
router.post('/instructor', profilesCtrl.createInstructorProfile);
// POST /profiles/student - create functionality
router.post('/student', profilesCtrl.createStudentProfile);
// GET /profiles/instructor - create functionality
router.get('/instructor/:id', profilesCtrl.showInstructor)
// GET /profiles/student - create functionality
router.get('/student/:id', profilesCtrl.showInstructor)




module.exports = router;