const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = 'http://ziptasticapi.com/zipcode'


module.exports = {
    edit,
    studentHome,
    instructorHome,
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

function edit(req, res) {
    const profile = Profile.findById(req.params.id);
    res.render('profiles/edit', { profile });

}
function studentHome(req, res) {
    Profile.find({ isInstructor: true }).populate('instruments').exec(function (err, profiles) {
        res.render('profiles/instructors/index', { title: 'Student', profiles });
    });
}
function instructorHome(req, res) {
    Profile.find({ isInstructor: true }).populate('instruments').exec(function (err, profiles) {
        res.render('profiles/index', { title: 'Instructors', profiles });
    });
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
    Profile.create({ instruments: req.body._id }, function (err, profile) {
        if (err) return res.redirect('/profiles/new');
        res.render('profiles/index', { profile });
    })
};

function createStudentProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = false;
    Profile.create(req.body, function (err, profile) {
        if (err) return res.redirect('/profiles/new');
        res.redirect('profiles/student/home');
    })
};


function showInstructor(req, res) {
    Profile.findById(req.params.id)
        .populate('instruments').exec(function (err, instructor) {
            res.render('profiles/instructors/show', { instructor })
        })
}

function showStudent(req, res) {
    Profile.findById(req.params.id)
        .populate('instruments').populate('chosenInstructors')
        .exec(function (err, student) {
            res.render('profiles/students/index', { student })
        });
}

function update(req, res) {
    Profile.find({ user: req.user._id }, (err, student) => {
        const profile = new Profile({});
        profile.chosenInstructors.push(req.params.id);
        console.log(profile);
        profile.save((err, instructors) => {
            // res.redirect(`/profiles/student/${student._id}`);
            res.redirect('/profiles/student/home');
        });
    });
}

function deleteMatch(req, res) {
    Profile.findByIdAndDelete(req.params.id, function (err) {
        // res.redirect(`profiles/student/${student._id}`);
        res.redirect('/profiles/student/home');
    });
}
