const mongoose = require('mongoose');

const { Schema } = mongoose;

const vocaSchema = new Schema({
    googleId: String,
    ta: String,
    tl: String,
    tv: String
});

const voca = mongoose.model('vocabularys', vocaSchema);

module.exports = voca