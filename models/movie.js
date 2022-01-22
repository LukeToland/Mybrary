const mongoose = require('mongoose');

const posterImageBasePath = 'uploads/moviePosters';

const movie2Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    releaseDate: {
        type: Date,
        required: true
    },
    runTime: {
        type: Number,
        required: true
    },
    createdAtDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    posterImage: {
        type: String,
        required: true
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Director'
    }
});

module.exports = mongoose.model('Movie2', movie2Schema);
module.exports.posterImageBasePath = posterImageBasePath;