const mongoose = require('mongoose');

const Album = new mongoose.Schema({
    title: { type: String, required: [true, 'Title is required'], lowercase: true },
    description: { type: String, required: [true, 'Description is required'], lowercase: true, min: 5, max: 200 },
    yearOfRelease: {
        type: Date,
        required: [true, 'Year of Release is required'],
        validate: {
            validator: function (v) {
                const year = v.getFullYear();
                return year > 0;
            },
            message: 'Release date should be greater than 0',
        },
    },
    songs: [{ title: { type: String, required: true }, duration: { type: Number, required: true } }],
    coverImageUrl: { type: String }
});

module.exports = mongoose.model('Album', Album);