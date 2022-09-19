const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')

// starting path /profiles

router.get('/new', profilesCtrl.newProfile)
router.get('/new/instructor', profilesCtrl.newInstructorForm)
router.get('/new/student', profilesCtrl.newStudentForm)
router.post('/new/instructor', profilesCtrl.createInstructorProfile);
router.post('/new/student', profilesCtrl.createStudentProfile);
router.get('/instructor/:id', profilesCtrl.showInstructor)
router.get('/student/:id', profilesCtrl.showStudent)

// student viewing a teacher page (different nav bar)
router.get('/instructors', profilesCtrl.getAll)
router.get('/instructors/:id', profilesCtrl.showTeacher)


router.put('/add-instructor/:id', profilesCtrl.addToStudentProfile)





//IN PROGRESS - add a view all instuctors and student page so students can add them and instructors can accept them
// look into bootstrap and materialize and also refactoring for react
router.get('/:id/edit', profilesCtrl.edit)


router.put('/instructor/home', profilesCtrl.updateProfile);
// router.put('/students/:id', profilesCtrl.update);

router.delete('/students/:id', profilesCtrl.delete);
router.delete('/student/:id', profilesCtrl.deleteStudent);

module.exports = router;