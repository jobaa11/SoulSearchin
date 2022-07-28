const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const profileSchema = new Schema({
    nickname: String,
    isInstructor: Boolean,
    location: { type:
        String, required: true
    },
    bio: String,
    instruments: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
    genres: [{ type: String, enum: ['R&B', 'FUNK', 'JAZZ', 'POP', 'ROCK', 'BOSSA NOVA'] }],
    budget: {
        type: Number,
        // min: 1,
        required: true
    },
    skillLevel: { type: String, enum: ['Novice', 'Beginner', 'Intermediate', 'Advance', 'Virtuoso'] },
    needs: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
    availability: String,
    interest: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    chosenInstructors: [{ type: Schema.Types.ObjectId, ref: 'Profile' }],

}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);