const Instrument = require('../models/instrument')

module.exports = {
    addInstrument,
    update
}

function addInstrument(req, res) {
    Instrument.find({}, function (err, instrument) {
        res.render('instruments', { instrument })
    })
}

function update(req, res) {
    const instrument = new Instrument(req.body,
        function (err, instru) {
            instrument.save(function (err, music) {
                res.redirect('/instruments');
            })
        })
}