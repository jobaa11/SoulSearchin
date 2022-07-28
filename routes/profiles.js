const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')




// GET /profile/new - new Profile functionality 
router.get('/new', profilesCtrl.newProfile)
// GET /profiles/instructor - new Instructor functionality
router.get('/new/instructor', profilesCtrl.newInstructor)
// GET /profiles/new/student new Student
router.get('/new/student', profilesCtrl.newStudent)
// POST /profiles/instructor - create Instructor functionality
router.post('/instructor', profilesCtrl.createInstructorProfile);
// POST /profiles/student - create Student functionality
router.post('/student', profilesCtrl.createStudentProfile);
// GET /profiles/instructor - show Instructor functionality
router.get('/instructor/:id', profilesCtrl.showInstructor)
// GET /profiles/student - show S functionality
router.get('/student/:id', profilesCtrl.showStudent)
// PUT /student/:id update "student profile" functionality
router.put('/student/:id', profilesCtrl.update);
// DELETE /student/:id delete functionality
router.delete('/student/:id', profilesCtrl.delete);




module.exports = router;