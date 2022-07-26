const Profile = require('../models/profile');
const Instrument = require('../models/instrument');
// const rootUrl = 'http://ziptasticapi.com/zipcode'


module.exports = {
    new: newProfile,
    newAcc
}

function newProfile(req, res) {
    res.render('profiles/new');
}

function newAcc(req, res) {
    const url = req.url;
    if (url === '/profile/students') {
        res.render('profile/students')
    } else {
        res.render('profiles/instructors');
    }
}



