const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = 'http://ziptasticapi.com/zipcode'


module.exports = {
    newProfile,
    newInstructor,
    newStudent,
    showInstructor,
    showStudent,
    createInstructorProfile,
    createStudentProfile,
    update,
    delete: deleteMatch
}

function newProfile(req, res) {
    res.render('profiles/new');
}

function newInstructor(req, res) {
    Instrument.find({}, function (err, instruments) {
        res.render('profiles/new/instructor', { instruments });
    });
}
function newStudent(req, res) {
    Instrument.find({}, function (err, instruments) {
        res.render('profiles/new/student', { instruments });
    });
}
function createInstructorProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = true;
    Profile.create(req.body, function (err, profile) {
        if (err) return res.redirect('/profiles/new')
        res.redirect('/profiles/instructors/');

    });
}
function createStudentProfile(req, res) {
    req.body.user = req.user._id;
    req.body.interest = req.body.interest.toUpperCase();
    req.body.isInstructor = false;
    Profile.create(req.body, function (err, profile) {
        if (err) return res.redirect('/profiles/new')
        res.redirect('profiles/students');
    });
}

function showInstructor(req, res) {
    Profile.findById(req.params.id)
    .populate('instruments').exec(function (err, instructor) {
        res.render('profiles/instructors/show', { instructor })
    })
}

function showStudent(req, res) {
    Profile.findById(req.params.id)
    .populate('instruments')
    .exec(function (err, student) {
        res.render('profiles/students/index', { student })
    });
}

function update(req, res) {
    req.body.user = req.user._id;
    Profile.findById(req.params.id, (err, student) => {
        student.chosenInstructors.push(req.body.instructorId);
        student.save((err) => {
            if (err) return res.redirect('/');
            res.redirect(`/profiles/students/${req.params.id}`, { student });
        });
    });
}


function deleteMatch(req, res) {
    Profile.findByIdAndDelete(req.params.id, function (err) {
        res.redirect(`profiles/students/${student._id}`);
    });
}
