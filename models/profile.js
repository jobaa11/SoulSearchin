const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const needsSchema = new Schema({
    wants: [{ type: Schema.Types.ObjectId, ref: 'Instruments' }],
}, {
    timestamps: true
});

const genreSchema = new Schema({
    style: { type: String, enum: ['R&B', 'FUNK', 'JAZZ', 'POP', 'ROCK', 'BOSSA NOVA'] }
})

const profileSchema = new Schema({
    name: {
        type: String,
        match: /.{12,}/,
    },
    student: {
        type: Boolean,
        default: false
    },
    location: String,
    instruments: [{ type: Schema.Types.ObjectId, ref: 'Instruments' }],
    genres: [genreSchema],
    budget: {
        type: Number,
        min: Number,
        max: Number,
        required: true
    },
    skillLevel: { type: String, enum: ['Novice', 'Beginner', 'Intermediate', 'Advance', 'Virtuoso'] },
    needs: [needsSchema],
    availability: String,
    interest: [],
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);