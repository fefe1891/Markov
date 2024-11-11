const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');
const { htmlToText } = require('html-to-text');

async function generateText(input) {
  let text;

  if (input.startsWith("http://") || input.startsWith("https://")) {
    const response = await axios.get(input);
    text = htmlToText(response.data, {
        wordwrap: 130
    });
  } else {
    text = fs.readFileSync(input, 'utf8', err => {
      if (err) {
        console.error(`Cannot read file: ${input}`);
        process.exit(1);
      }
    });
  }

  const markovMachine = new MarkovMachine(text);
  for (let sentence of markovMachine.makeText()) {
    console.log(sentence);
  }
}

function handleInput() {
  const mode = process.argv[2];
  const inputs = process.argv.slice(3);

  if (mode !== 'file' && mode !== 'url') {
    console.error(`Invalid mode: ${mode}`);
    process.exit(1);
  }

  if (!inputs) {
    console.error('No input provided');
    process.exit(1);
  }

  inputs.forEach(input => generateText(input));
}

handleInput();