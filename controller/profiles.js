const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = 'http://ziptasticapi.com/zipcode'


module.exports = {
    new: newProfile,
    show
}

function newProfile(req, res) {
    res.render('profiles/new');
}

function show(req, res) {
    const instruments = Instrument.schema.path('name').enumValues;
    const genres = Profile.schema.path('genres.style').enumValues;
        res.render('profiles/instructors', { instruments, genres });
}



