var mongoose = require('mongoose');

var guestlistSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  date: { type: Date },
  attendees: [{
    name: String,
    email: String,
    signup: { type: Date, default: Date.now },
    arrived: { type: Boolean, default: false },
    tickets: {
      total: { type: Number, default: 1 },
      used: { type: Number, default: 0 },
      left: { type: Number, default: 0 }
    }
  }],
  owner: mongoose.Schema.ObjectId
}, { timestamps: true });

var Guestlist = mongoose.model('Guestlist', guestlistSchema);
module.exports = Guestlist;
