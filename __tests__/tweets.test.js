require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Tweet = require('../lib/models/Tweet');


describe('routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('posts a tweet', () => {
    return request(app)
      .post('/api/v1/tweets')
      .send({ handle: 'Mikey', text: 'What this do?' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'Mikey', 
          text: 'What this do?',
          __v: 0
        });
      });
  });

  it('gets all tweets', () => {
    const tweets = [
      { handle: 'Mikey', text: 'What this do?' },
      { handle: 'Rico', text: 'IDK, I\'m just a bird' }
    ];

    return Tweet.create(tweets)
      .then(() => {
        return request(app)
          .get('/api/v1/tweets');
      })
      .then(res => {
        expect(res.body).toHaveLength(2);

        tweets.forEach(tweet => {
          expect(res.body).toContainEqual({
            _id: expect.any(String),
            ...tweet,
            __v: 0
          });
        });
      });
  });

  it('gets tweet by id', () => {
    return Tweet.create({
      handle: 'Mikey',
      text: 'What this do?'
    })
      .then(tweet => {
        return request(app)
          .get(`/api/v1/tweets/${tweet.id}`);
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          handle: 'Mikey',
          text: 'What this do?',
          __v: 0
        });
      });
  });
});
