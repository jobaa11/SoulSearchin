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
    const instruments = Instrument.schema.path('instruments').nameValues;
    res.render('profiles/instructors', { instruments, genres });
}


