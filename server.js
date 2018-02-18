'use strict';

const express = require('express');
const strftime = require('strftime');

const port = process.env.PORT || 8080;

const website = process.cwd() + '/public';

var app = express();

app.use(express.static(website));

app.get("/:id", (request, response) => {
    response.json(parseTime(request.params.id));
});

app.set('json spaces', 2);

app.listen(port,  function () {
    console.log('Node.js listening on port ' + port + '...');
});

function parseTime(string) {
  var number = new Number(string);

  var date = new Date(isNaN(number) ? string : number * 1000);

  var values = {
    "unix":    date.getTime() / 1000,
    "natural": date.toDateString(),
    };

  if (values.natural == "Invalid Date")
    values.natural = null;
  else
    values.natural = strftime("%B %d, %Y", date);

  return values;
}
