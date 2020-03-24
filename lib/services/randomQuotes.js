const request = require ('superagent');

module.exports = () => {
  return request
    .get('https://futuramaapi.herokuapp.com/api/quotes/1')
    .then(res => res.body[0]);
};
