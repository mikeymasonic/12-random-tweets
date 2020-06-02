const getRandomQuote = require('./randomQuotes');

// jest.mock('superagent', () => {
//   return {
//     get() {
//       return Promise.resolve ({
//         body: ['A grim day for robot-kind. But we can always build more killbots.']
//       });
//     }
//   };
// });

describe('get quotes function', () => {
  it('gets a futurama quote', () => {
    return getRandomQuote()
      .then(res => {
        expect (res.quote).toEqual(expect.any(String));
      });
  });
});
