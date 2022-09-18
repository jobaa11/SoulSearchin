const Profile = require('../models/profile');
const Instrument = require('../models/instrument');




// ADD ZIP CODE API (ADD PROPERTY TO MODEL AND FORM)
// import fetch from 'node-fetch';
// const rootUrl = fetch('http://ziptasticapi.com/zipcode')


module.exports = {
    newProfile,
    newInstructorForm,
    newStudentForm,
    createInstructorProfile,
    createStudentProfile,
    showInstructor,
    showStudent,
    getAll,
    showTeacher,
    




    edit,
    updateProfile,
    studentHome,
    delete: deleteMatch,
    deleteStudent,
    // update,
}


// working 

function newProfile(req, res) {
    res.render('profiles/new/new');
}

function newInstructorForm(req, res) {
    newInstructor = new Profile(req.body)
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/new/instructor', { instruments, instructor: newInstructor });
    });
}

function newStudentForm(req, res) {
    newStudent = new Profile(req.body)
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/new/student', { instruments, student: newStudent });
    });
}

function createInstructorProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = true;
    Profile.create(req.body, function (err, profile) {
        if (err) return res.redirect('/profiles/new');
        res.redirect(`/profiles/instructor/${profile._id}`);
    })
};

function createStudentProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = false;
    Profile.create(req.body, function (err, profile) {
        if (err) return res.redirect('/profiles/new');
        res.redirect(`/profiles/student/${profile._id}`);
    })
};

function showInstructor(req, res) {
    Profile.findById(req.params.id).populate('instruments').exec(function (err, profile) {
        res.render('profiles/instructors/index', { profile })
    })
}

function showStudent(req, res) {
    Profile.findById(req.params.id).populate('instruments').populate('needs').exec(function (err, student) {
        res.render('profiles/students/index', { student })
    });
}

function getAll(req, res) {
    Profile.find({ isInstructor: true }).populate('instruments').exec(function (err, instructors) {
        if (err) return res.redirect(`/profiles/students/${req.user._id}`)
        res.render('profiles/instructors/list', { instructors })
    })
}
function showTeacher(req, res) {
    Profile.findById(req.params.id).populate('instruments').exec(function (err, instructor) {
        res.render('profiles/instructors/show', { instructor })
    })
}








function updateProfile(req, res) {
    Profile.updateOne({ user: req.params.id }, function (err, profile) {
        profile.save(function (err) {
            if (err) return console.log(err)
            res.redirect('/profiles/instructor/home');
        });
    });
};

function edit(req, res) {
    const profile = Profile.findById(req.params.id);
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/instructors/edit', { profile, instruments });
    });
}
function studentHome(req, res) {
    Profile.find({ isInstructor: true }, (function (err, profile) {
        res.render('profiles/instructors/index', { title: 'Student', profile });
    }))
}














// function update(req, res) {
//     Profile.find({ 'user': req.user._id }, (err, student) => {
//         const profile = new Profile({});
//         profile.chosenInstructors.push(req.params.id, student);
//         profile.save((err,) => {
//             res.redirect('/profiles/student/home');
//         });
//     });
// }

function deleteMatch(req, res) {
    Profile.findByIdAndDelete(req.params.id, function (err) {
        res.redirect('/profiles/student/home');
    });
}
function deleteStudent(req, res) {
    Profile.findByIdAndDelete(req.params.id, function (err) {
        res.redirect('/profiles/student/home');

    });
}
