const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentSchema = new Schema({
    name: {type: String, enum: ['Piano', 'Guitar', 'Percussion', 'Bass', 'Saxophone', 'Trumpet']}
})
const genreSchema = new Schema({
    style: {type: String, enum: ['R&B', 'FUNK', 'JAZZ', 'POP', 'ROCK', 'BOSSA NOVA']}
})

module.exports = mongoose.model('Instrument', instrumentSchema);