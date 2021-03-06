const { Router } = require('express');
const Tweet = require('../models/Tweet');
const Comment = require('../models/Comment');

module.exports = Router()
  .post('/', (req, res, next) => {
    Tweet
      .create(req.body)
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tweet
      .find()
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Promise.all([
      Tweet
        .findById(req.params.id),
      Comment
        .find({ tweet: req.params.id })
    ])
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Tweet
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(tweet => res.send(tweet))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Tweet
      .findByIdAndDelete(req.params.id)
      .then(tweet => res.send(tweet))
      .catch(next);
  });
