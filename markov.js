/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = {};

    for (let i = 0; i < this.words.length; i++) {
      // Use bigrams as a key in our chains object
      let bigram = `${this.words[i]} ${this.words[i + 1]}`;
      let nextWord = this.words[i + 2] || null;

      if (chains[bigram]) {
        chains[bigram].push(nextWord);
      }else {
        chains[bigram] = [nextWord];
      }
    }
    this.chains = chains;
  }


  /** return random text from chains */

  *makeText(numWords = 100) {
    let keys = Object.keys(this.chains);

    // Select only keys that start with a capital letter
    let keysThatStartSentences = keys.filter(key => key[0] === key[0].toUpperCase());

    // Choose a random key that starts a sentence
    let initialBigram = keysThatStartSentences[Math.floor(Math.random() * keysThatStartSentences.length)];
    let out = initialBigram.split(" "); // bigram split into array


    while (out.length < numWords) {
      let key = `${out[out.length - 2]} ${out[out.length - 1]}`; // we treat last two words as our bigram key
      let possibleNextWords = this.chains[key];
      if (!possibleNextWords) {
        // if there are no possible next words, end the loop
        break;
      }
      let nextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
      if (!nextWord) { // if the next word is null, end the loop
        break
      }
      out.push(nextWord);
      yield out.join(" ");
    }
  }
}

module.exports = MarkovMachine;
