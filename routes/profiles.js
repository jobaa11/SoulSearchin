const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')




// GET /profiles/new/instructor 
router.get('/new/instructor', profilesCtrl.newInstructor)
// GET /profiles/new/student 
router.get('/new/student', profilesCtrl.newStudent)
// POST /profiles/instructor - create functionality
router.post('/new-instructor', profilesCtrl.createInstructorProfile);
router.post('/new-student', profilesCtrl.createStudentProfile);



module.exports = router;