const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {
        type: String,
        match: /.{12,}/,
    },
    location: String,
    instruments: [{type: Schema.Types.ObjectId, ref: 'Instruments'}],
    genres: [{type: Schema.Types.ObjectId, ref: 'Instruments'}],
    budget: {type: Number, 
        min: Number, 
        max: Number, 
        required: true
    },
    availability: String,
    interest: [],
},{
timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);