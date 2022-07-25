const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    username: {
        type: String,
        match: /.{12,}/
    },
    location: String,
    instruments: [{type: Schema.Types.ObjectId, ref: 'Instruments'}],
    genres: [],
    budget: {type: Number, 
        min: Number, 
        max: Number, 
        required: true
    },
    availability: String,
    interest: []
});

module.exports = mongoose.model('Profile', profileSchema);