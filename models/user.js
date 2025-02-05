const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    email: String,
    name: String,
    photo: String
});

const user = mongoose.model('users', userSchema);

module.exports = user