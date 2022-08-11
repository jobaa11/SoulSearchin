const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')


router.get('/instructor/home', profilesCtrl.instructorHome)

router.get('/student/home', profilesCtrl.studentHome)
// GET /profile/new - new Profile functionality 
router.get('/new', profilesCtrl.newProfile)
// GET /profiles/instructor - new Instructor functionality
router.get('/new/instructor', profilesCtrl.newInstructor)
// GET /profiles/new/student new Student
router.get('/new/student', profilesCtrl.newStudent)
// POST /profiles/instructor - create Instructor functionality
router.post('/new/instructors', profilesCtrl.createInstructorProfile);
// POST /profiles/student - create Student functionality
router.post('/new/students', profilesCtrl.createStudentProfile);
// GET /profiles/instructor - show Instructor functionality
// router.get('/instructor/:id', profilesCtrl.showInstructor)
// GET /profiles/student - show S functionality
router.get('/students/:id', profilesCtrl.showStudent)
// GET /:id/edit delete functionality
router.get('/:id/edit', profilesCtrl.edit)
// PUT /profiles/instructor/:id (update functionality)
router.put('/instructor/home', profilesCtrl.updateProfile);
// PUT /student/:id update "student profile" functionality
// router.put('/students/:id', profilesCtrl.update);
// DELETE /profiles/student/:id delete functionality
router.delete('/students/:id', profilesCtrl.delete);
//DELETE /profiles/student/:id
router.delete('/student/:id', profilesCtrl.deleteStudent);




module.exports = router;