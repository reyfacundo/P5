const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: { type: String, required: true, lowercase: true, min: 2 },
    lastName: { type: String, lowercase: true, min:2 },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                return regex.test(v);
            },
            message: ' You must enter a valid email!'
        },
    },
    password: { type: String, required: true, min:5 },
    favorites: [{ name: { type: String } }]
});

module.exports = mongoose.model('User', User);