var mongoose = require('mongoose');

var guestlistSchema = mongoose.Schema({
    title: String
});

var Guestlist = mongoose.model('Guestlist', guestlistSchema);
exports.add = Guestlist;