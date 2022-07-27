const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = 'http://ziptasticapi.com/zipcode'


module.exports = {
    newInstructor,
    newStudent,
    createInstructorProfile,
    createStudentProfile,
    showInstructor,
    showStudent
}

function newInstructor(req, res) {
    res.render('profiles/new/instructor');
}
function newStudent(req, res) {
    res.render('profiles/new/student');
}

function createInstructorProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = true;
    Profile.create(req.body, function(err, profile) {
        if (err) return res.redirect('/profiles/instructor')
        console.log('req.body', req.body)
        res.redirect(`/profile/instructor/${profile._id}`);
 
    });
}
function createStudentProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = false;
    Profile.create(req.body, function(err, profile) {
        if (err) return res.redirect('/profiles/student')
        res.redirect(`/profile/student/${profile._id}`);
    });
}

function showInstructor(req, res) {
    Profile.findById(req.params.id)
    .populate('instruments', 'genres')
    .exec(function(err, instructor) {
        res.render('profiles/show-instructor', { instructor })
    })
}
function showStudent(req, res) {
    Profile.findById(req.params.id)
    .populate('instruments')
    .exec(function(err, student) {
        res.render('profiles/show-student', { student })
    })
}
