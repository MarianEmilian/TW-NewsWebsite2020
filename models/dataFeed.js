const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    domains: [String],
    url: String,
    website: String,
    published: Date,
    image: String
});

module.exports = mongoose.model('DataFeed', dataSchema);