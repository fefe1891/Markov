const MarkovMachine = require("./markov");
let mm = null;

beforeEach(function () {
  mm = new MarkovMachine("the cat in the hat");
});

test('makeChains method test', function () {
  expect(mm.chains).toEqual({"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]});
});

test('makeText method test', function () {
  const outputText = mm.makeText(50);
  expect(outputText.split(' ').length).toBeLessThanOrEqual(51);  // we add 1 to account for possible errors due to randomness
});