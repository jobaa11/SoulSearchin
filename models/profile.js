const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const needsSchema = new Schema({
    wants: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
}, {
    timestamps: true
});

const genreSchema = new Schema({
    style: { type: String, enum: ['R&B', 'FUNK', 'JAZZ', 'POP', 'ROCK', 'BOSSA NOVA'] }
})

const profileSchema = new Schema({
    nickname: String,
    isInstructor: Boolean,
    location: { type:
        String, required: true
    },
    bio: String,
    instruments: [{ type: Schema.Types.ObjectId, ref: 'Instrument' }],
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
    interest: String,
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true}
}, {
    timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);