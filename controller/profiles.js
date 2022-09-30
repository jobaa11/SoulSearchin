const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
const fetch = require('node-fetch')

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
    showPupil,
    addAssociation,
    edit,
    updateProfile,
    viewMyStudents,
    removePupil,
    deletePage,
    deleteProfile,
}

function newProfile(req, res) {
    res.render('profiles/new/new');
}

function newInstructorForm(req, res) {
    console.log(req)
    const newInstructor = new Profile(req.body)
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/new/instructor', { instruments, instructor: newInstructor });
    });
}

function newStudentForm(req, res) {
    const newStudent = new Profile(req.body)
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

async function showInstructor(req, res) {
    await Profile.findById(req.params.id).populate('instruments').populate('chosenStudents').exec(function (err, profile) {
        const url = fetch(`http://ziptasticapi.com/${profile.location}`)
            .then(res => res.json())
            .then(location => {
                res.render('profiles/instructors/index', { profile, location })
            })
    })
}

async function showStudent(req, res) {
    await Profile.findById(req.params.id).populate('instruments').populate('needs').populate('chosenInstructors').exec(function (err, student) {
        const url = fetch(`http://ziptasticapi.com/${student.location}`)
            .then(res => res.json())
            .then(location => {
                res.render('profiles/students/index', { student, location })
            })
    });
}

async function getAll(req, res) {
    await Profile.find({ isInstructor: true }).populate('instruments').exec(function (err, instructors) {
        if (err) return res.redirect(`/profiles/students/${req.user._id}`)
        res.render('profiles/instructors/list', { instructors })
    })
}

function viewMyStudents(req, res) {
    Profile.findOne({ user: req.user._id }).populate('needs').populate('instruments').populate('chosenStudents').exec(function (err, teacher) {
        res.render('profiles/students/list', { teacher })
    })
}

async function showTeacher(req, res) {
    const student = await Profile.findOne({ user: req.user._id })
    Profile.findById(req.params.id).populate('instruments').exec(function (err, instructor) {
        const url = fetch(`http://ziptasticapi.com/${instructor.location}`)
            .then(res => res.json())
            .then(location => {
                res.render('profiles/instructors/show', { instructor, student, location })
            })
    })
}
async function showPupil(req, res) {
    await Profile.findById(req.params.id).populate('instruments').populate('needs').exec(function (err, student) {
        const url = fetch(`http://ziptasticapi.com/${student.location}`)
            .then(res => res.json())
            .then(location => {
                res.render('profiles/students/show', { student, location })
            })
    })
}

async function addAssociation(req, res) {
    const instructor = await Profile.findById(req.params.id)
    const student = await Profile.find({ user: req.user._id })
    await Profile.updateOne
        ({ user: req.user._id },
            {
                $addToSet: {
                    chosenInstructors: instructor
                }
            }
        )
    await Profile.updateOne
        ({ _id: req.params.id },
            {
                $addToSet: {
                    chosenStudents: student
                }
            }
        )
    res.redirect(`/profiles/student/${student[0]._id}`)
}

async function edit(req, res) {
    const profile = await Profile.findOne({ _id: req.params.id, user: req.user._id })
    Instrument.find({}).populate('name').exec(function (err, instruments) {
        res.render('profiles/edit', { profile, instruments });
    });
}

function updateProfile(req, res) {
    let role;
    Profile.findOneAndUpdate(
        { _id: req.params.id, user: req.user._id },
        req.body,
        { new: true },
        function (err, profile) {
            profile.isInstructor ?
                role = 'instructor'
                :
                role = 'student'
            if (err) return console.error(err)
            res.redirect(`/profiles/${role}/${profile._id}`);
        }
    );
};

async function removePupil(req, res) {
    const teacher = await Profile.findOne({ user: req.user._id })
    await Profile.updateOne({ user: req.user._id },
        {
            $pullAll: {
                chosenStudents: [{ _id: req.params.id }]
            }
        }
    )
    await Profile.updateOne({ _id: req.params.id },
        {
            $pullAll: {
                chosenInstructors: [{ _id: teacher._id }]
            }
        }
    )
    res.redirect(`/profiles/instructor/${teacher._id}`)

};

async function deletePage(req, res) {
    let role;
    const profile = await Profile.findOne({ _id: req.params.id })
    profile.isInstructor ? role = 'instructor' : role = 'student'
    res.render('profiles/delete', { profile, role })
}

function deleteProfile(req, res) {
    Profile.findByIdAndDelete(req.params.id, function (err) {
        res.redirect('/profiles/new');
    });
}
