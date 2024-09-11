const mongoose = require('mongoose');

const { Schema } = mongoose;

const historySchema = new Schema({
    googleId: String,
    word: String
});

const history = mongoose.model('historys', historySchema);

module.exports = history