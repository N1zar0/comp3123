const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 50
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;