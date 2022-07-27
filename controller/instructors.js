const Profile = require('../models/profile');
const Instrument = require('../models/instrument');

module.exports = {
    index
}

function index(req, res) {
    res.render('profiles/instructors/index');
}

