const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')

router.get('/new', profilesCtrl.newProfile)
router.get('/new/instructor', profilesCtrl.newInstructorForm)
router.get('/new/student', profilesCtrl.newStudentForm)
router.post('/new/instructor', profilesCtrl.createInstructorProfile);
router.post('/new/student', profilesCtrl.createStudentProfile);
router.get('/instructor/:id', profilesCtrl.showInstructor)
router.get('/student/:id', profilesCtrl.showStudent)
router.get('/instructors', profilesCtrl.getAll)
router.get('/instructor/:id/students', profilesCtrl.viewMyStudents)
router.get('/instructors/:id', profilesCtrl.showTeacher)
router.get('/students/:id', profilesCtrl.showPupil)
router.put('/add-instructor/:id', profilesCtrl.addToStudentProfile)
router.get('/:id/edit', profilesCtrl.edit)
router.put('/:id', profilesCtrl.updateProfile);







//IN PROGRESS 
// look into bootstrap and materialize and also refactoring for react



router.delete('/students/:id', profilesCtrl.delete);
router.delete('/student/:id', profilesCtrl.deleteProfile);

module.exports = router;