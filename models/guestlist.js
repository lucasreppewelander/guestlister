var mongoose = require('mongoose');

var guestlistSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  date: { type: Date },
  owner: mongoose.Schema.ObjectId
}, { timestamps: true });

var Guestlist = mongoose.model('Guestlist', guestlistSchema);
module.exports = Guestlist;
