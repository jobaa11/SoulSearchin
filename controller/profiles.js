const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = 'http://ziptasticapi.com/zipcode'


module.exports = {
    newInstructor,
    newStudent,
    createInstructorProfile,
    createStudentProfile
}

function newInstructor(req, res) {
    res.render('profiles/new-instructor');
}
function newStudent(req, res) {
    res.render('profiles/new-student');
}

function createInstructorProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = true;
    Profile.create(req.body, function(err, profile) {
        res.redirect('/profile/instructor');
    });
}
function createStudentProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = false;
    Profile.create(req.body, function(err, profile) {
        res.redirect('/profile/student');
    });
}
