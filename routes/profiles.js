const express = require('express');
const router = express.Router();
const profilesCtrl = require('../controller/profiles')

// starting path
// /profiles

//WORKS
router.get('/new', profilesCtrl.newProfile)
router.get('/new/instructor', profilesCtrl.newInstructorForm)
router.post('/new/instructor', profilesCtrl.createInstructorProfile);
router.get('/instructor/:id', profilesCtrl.showInstructor)





//IN PROGRESS
router.get('/student/home', profilesCtrl.studentHome)
router.get('/new/student', profilesCtrl.newStudent)
router.get('/students/:id', profilesCtrl.showStudent)
router.get('/:id/edit', profilesCtrl.edit)






router.post('/new/student', profilesCtrl.createStudentProfile);



router.put('/instructor/home', profilesCtrl.updateProfile);
// router.put('/students/:id', profilesCtrl.update);


router.delete('/students/:id', profilesCtrl.delete);
router.delete('/student/:id', profilesCtrl.deleteStudent);

module.exports = router;