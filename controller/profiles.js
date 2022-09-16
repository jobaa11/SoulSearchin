const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = request.get('http://ziptasticapi.com/zipcode')


module.exports = {
    newProfile,
    newInstructorForm,
    createInstructorProfile,
    showInstructor,





    edit,
    updateProfile,
    studentHome,
    newStudent,
    showStudent,
    createStudentProfile,
    delete: deleteMatch,
    deleteStudent,
    // instructorPage,
    // update,
}





//POST /profiles/new/instructor
function createInstructorProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = true;
    Profile.create(req.body, function (err, profile) {
        if (err) return res.redirect('/profiles/new');
        res.redirect(`/profiles/instructor/${profile._id}`);
    })
};



// GET /profiles/instructor/:id
function showInstructor(req, res) {
    Profile.findById(req.params.id).populate('instruments').exec(function (err, profile) {
        res.render('profiles/index', { profile })
    })
}

function newProfile(req, res) {
    res.render('profiles/new');
}


function newInstructorForm(req, res) {
    newInstructor = new Profile(req.body)
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/new/instructor', { instruments, instructor: newInstructor });
    });
}


// function instructorPage(req, res) {
//     res.render('profiles/index');
// }

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






//WHY DO I HAVE INSTRUMENTS ON NEW INSTRUCTOR
function newStudent(req, res) {
    newStudent = new Profile({ isInstructor: false, user: req.user.id }, req.body)
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/new/student', { instruments, student: newStudent });
    });
}




function createStudentProfile(req, res) {
    req.body.user = req.user._id;
    req.body.isInstructor = false;
    instruments = Instrument.schema.path('name').enumValues;
    Profile.create(req.body, function (err, profile, instruments) {
        if (err) {
            console.log(err);
            return res.redirect('/');
        }
        res.redirect('/profiles/student/home', { profile, instruments });
    })
};



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
