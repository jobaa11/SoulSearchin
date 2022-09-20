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
router.get('/:id/edit', profilesCtrl.edit)
router.get('/:id/delete', profilesCtrl.deletePage);
router.put('/:id', profilesCtrl.updateProfile);
router.put('/match/:id', profilesCtrl.addAssociation)
router.delete('/students/:id', profilesCtrl.removePupil);
router.delete('/:id', profilesCtrl.deleteProfile);

module.exports = router;