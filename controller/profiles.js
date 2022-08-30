const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = request.get('http://ziptasticapi.com/zipcode')


module.exports = {
    edit,
    updateProfile,
    studentHome,
    instructorHome,
    newProfile,
    newInstructor,
    newStudent,
    showInstructor,
    showStudent,
    createInstructorProfile,
    createStudentProfile,
    // update,
    delete: deleteMatch,
    deleteStudent
}
function updateProfile(req, res) {
    Profile.updateOne({user: req.params.id}, function (err, profile) {
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
    Profile.find({ isInstructor: true }).populate('instruments').exec(function (err, profiles) {
        res.render('profiles/instructors/index', { title: 'Student', profiles });
    });
}
function instructorHome(req, res) {
    res.render('profiles/index');
}


function newProfile(req, res) {
    res.render('profiles/new');
}

function newInstructor(req, res) {
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/new/instructor', { instruments });
    });
}
function newStudent(req, res) {
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/new/student', { instruments });
    });
}
function createInstructorProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = true;
    const instruments = Instrument.schema.path('name').enumValues;
    Profile.create(req.body, function (err, profile, instruments) {
        if (err) return res.redirect('/profiles/new');
        res.redirect('/profiles/index');
    })
};

function createStudentProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = false;
    const instruments = Instrument.schema.path('name').enumValues;
    Profile.create(req.body, function (err, profile, instruments) {
        if (err) return res.redirect('/profiles/new');
        res.redirect('/profiles/student/home');
    })
};


function showInstructor(req, res) {
    Profile.findById(req.params.id).populate('instruments').exec(function (err, instructor) {
        res.render('profiles/instructors/show', { instructor })
    })
}

function showStudent(req, res) {
    Profile.findById(req.params.id).populate('instruments').exec(function (err, student) {
        res.render('profiles/students/index', { student })
    });
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
