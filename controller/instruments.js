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

// function update(req, res) {
//     Instrument.updateOne({_id: req.body.instruments }, { $push: {name: req.body.instruments }  }, {upsert: true} , function(err, instrument) {

//         res.redirect('/instruments');
//     })
// }

function update(req, res) {
    const instrument = new Instrument(req.body,
        function (err, instru) {
            instrument.save(function (err, music) {
                console.log(instru);
                res.redirect('/instruments');
            })
        })

}