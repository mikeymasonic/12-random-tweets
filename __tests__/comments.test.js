require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Comment = require('../lib/models/Comment');
const Tweet = require('../lib/models/Tweet');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a comment', () => {
    return Tweet.create({
      handle: 'Mikey',
      text: 'What this do?'
    })
      .then(tweet => {
        return request(app)
          .post('/api/v1/comments')
          .send({ comment: 'idk', tweet: tweet._id });
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          comment: 'idk',
          tweet: expect.any(String),
          __v: 0
        });
      });
  });

  it('gets a comment by id', () => {
    return Tweet.create({ 
      handle: 'Mikey', 
      text: 'What this do?' 
    })
      .then(tweet => {
        return Comment.create({
          comment: 'idk',
          tweet: tweet._id
        })
          .then(comment => {
            return request(app)
              .get(`/api/v1/comments/${comment.id}`);
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              comment: 'idk',
              tweet: {
                _id: expect.any(String),
                handle: 'Mikey',
                text: 'What this do?',
                __v: 0
              },
              __v: 0
            });
          });
      });
  });

  it('updates a comment by id', () => {
    return Tweet.create({ 
      handle: 'Mikey', 
      text: 'What this do?' 
    })
      .then(tweet => {
        return Comment.create({
          comment: 'idk',
          tweet: tweet._id
        })
          .then(commentToUpdate => {
            return request(app)
              .patch(`/api/v1/comments/${commentToUpdate.id}`)
              .send({ comment: 'idk what?' });
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              comment: 'idk what?',
              tweet: expect.any(String),
              __v: 0
            });
          });
      });
  });

  it('deletes a comment by id', () => {
    return Tweet.create({ 
      handle: 'Mikey', 
      text: 'What this do?' 
    })
      .then(tweet => {
        return Comment.create({
          comment: 'idk',
          tweet: tweet._id
        })
          .then(commentToDelete => {
            return request(app)
              .delete(`/api/v1/comments/${commentToDelete.id}`);
          })
          .then(res => {
            expect(res.body).toEqual({
              _id: expect.any(String),
              comment: 'idk',
              tweet: expect.any(String),
              __v: 0
            });
          });
      });
  });
});
