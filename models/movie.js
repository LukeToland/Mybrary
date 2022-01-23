const mongoose = require('mongoose');
const path = require('path');

const posterImageBasePath = 'uploads/moviePosters';

const movieSchema = new mongoose.Schema({
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
    posterImageName: {
        type: String,
        required: true
    },
    director: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Director'
    }
});

movieSchema.virtual('posterImagePath').get(function () {
    if (this.posterImageName != null) {
        return path.join('/', posterImageBasePath, this.posterImageName)
    }
})

module.exports = mongoose.model('MovieNew', movieSchema);
module.exports.posterImageBasePath = posterImageBasePath;