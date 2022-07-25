const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instrumentSchema = new Schema({
    name: {type: String, enum: ['Piano', 'Guitar', 'Percussion', 'Bass', 'Saxophone', 'Trumpet']}
})

module.exports = mongoose.model('Instrument', instrumentSchema);