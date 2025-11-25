'use strict';

const express = require('express');
const app = express();

function isNumeric(obj) {
  // https://stackoverflow.com/a/175787
  if (typeof obj != "string") return false;
  return !isNaN(obj) && !isNaN(parseFloat(obj));
}


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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});