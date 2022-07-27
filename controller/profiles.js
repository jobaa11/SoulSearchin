const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = 'http://ziptasticapi.com/zipcode'


module.exports = {
    newInstructor,
    newStudent,
    showInstructor,
    showStudent,
    createInstructorProfile,
    createStudentProfile
}

function newInstructor(req, res) {
    Instrument.find({}, function(err, instruments) {
        res.render('profiles/new/instructor', { instruments });
    });
}
function newStudent(req, res) {
    res.render('profiles/new/student');
}
function createInstructorProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = true;
    console.log('req.body', req.body);
    Profile.create(req.body, function (err, profile) {
        if (err) return res.redirect('/profiles/instructor')
        console.log('profile', profile)
        res.redirect('/');

    });
}
function createStudentProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = false;
    Profile.create(req.body, function (err, profile) {
        if (err) return res.redirect('/profiles/student')
        res.redirect(`/profiles/${profile._id}`);
    });
}

function showInstructor(req, res) {
    Profile.findById(req.params.id)
    .populate('instruments')
    .exec(function(err, profile) {
        res.render(`profiles/instructor/${profile._id}`)
    })
}

function showStudent(req, res) {
    Profile.findById(req.params.id)
        .populate('instruments')
        .exec(function (err, student) {
            res.render(`profiles/student/${profile._id}`, { student })
        });
}

