const mongoose = require('mongoose');
const getRandomQuote = require('../services/randomQuotes');

const schema = new mongoose.Schema({
  handle: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

schema.pre('save', function(next) {
  if(this.text) return next();

  getRandomQuote()
    .then(quote => this.text = quote)
    .then(() => next());
});

module.exports = mongoose.model('Tweet', schema);
