const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = 'http://ziptasticapi.com/zipcode'


module.exports = {
    new: newProfile,
    create,
}

function newProfile(req, res) {
    res.render('profiles/new');
}

function create(req, res) {
    const instruments = Instrument.schema.path('instruments').enumValues;
    const genres = Profile.schema.path('genres').enumValues;
    if (req.body.student) {
        res.res.direct('/profiles/students');
    } else {
        res.render('profiles/instructors', { instruments, genres });
    }
}


