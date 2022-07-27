const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')




// GET /profiles/new/instructor 
router.get('/new/instructor', profilesCtrl.newInstructor)
// GET /profiles/new/student 
router.get('/new/student', profilesCtrl.newStudent)
// POST /profiles/instructor - create functionality
router.post('/instructor', profilesCtrl.createInstructorProfile);
router.post('/student', profilesCtrl.createStudentProfile);
// GET /profiles/instructor - create functionality
router.get('/instructor/:id', profilesCtrl.showInstructor) 
// GET /profiles/student - create functionality
router.get('/instructor/:id', profilesCtrl.showInstructor)
 



module.exports = router;