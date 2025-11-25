'use strict';

const express = require('express');
const app = express();

function isNumeric(obj) {
  // https://stackoverflow.com/a/175787
  if (typeof obj != "string") return false;
  return !isNaN(obj) && !isNaN(parseFloat(obj));
}

let funnyJoke = [
  {
    'joke': 'Dlaczego komputer poszedł do lekarza?',
    'response': 'Bo złapał wirusa!'
  },
  {
    'joke': 'Dlaczego komputer nie może być głodny?',
    'response': 'Bo ma pełen dysk!'
  },
  {
    'joke': 'Co mówi jeden bit do drugiego?',
    'response': '„Trzymaj się, zaraz się przestawiamy!”'
  }
];
let lameJoke = [
  {
    'joke': 'Dlaczego programiści preferują noc?',
    'response': 'Bo w nocy jest mniej bugów do łapania!'
  },
  {
    'joke': 'Jak nazywa się bardzo szybki programista?',
    'response': 'Błyskawiczny kompilator!'
  }
];
let jokes = {
  funnyJoke: funnyJoke, 
  lameJoke: lameJoke
};

app.get('/math/power/:base/:exponent', (req, res) => {
  const base     = req.params.base;
  const exponent = req.params.exponent;
  let   root     = req.query.root ?? "false";

  // check if is numeric
  if (!isNumeric(base) || !isNumeric(exponent)) {
    res.status(400).json({
      "error": "Invalid input"
    });
  }

  const result = {
    "result": `${Math.pow(base, exponent)}`
  };
  if (root === "true") result["root"] = `${Math.sqrt(base)}`;
  res.json(result);
});

app.get('/jokebook/categories', (req, res) => {
  const jokeCategories = Object.keys(jokes);
  const response = {
    "status": "ok",
    "categories": jokeCategories
  }
  res.json(response);
});

app.get('/jokebook/joke/:category', (req, res) => {
  const cat            = req.params.category;
  const jokeCategories = Object.keys(jokes);

  // wrong category?
  if (!jokeCategories.includes(cat)) {
    res.status(404).json({
      status: "error",
      error: `no jokes for category ${cat}`
    });
  }
  // category exists? take a random joke from it
  const randomJoke = jokes[cat][Math.floor(Math.random() * jokes[cat].length)];
  const response = {
    "status": "ok",
    "joke": randomJoke
  }
  res.json(response);
});

app.get('/jokebook/joke/', (req, res) => {
  const jokeCategories = Object.keys(jokes);

  // select category
  const randomCategory = jokeCategories[Math.floor(Math.random() * jokeCategories.length)];

  // select a random joke from the category
  const randomJoke = jokes[randomCategory][Math.floor(Math.random() * jokes[randomCategory].length)];
  const response = {
    "status": "ok",
    "category": randomCategory,
    "joke": randomJoke
  }
  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});