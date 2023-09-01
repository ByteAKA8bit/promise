"use strict";
const util = require('util');
const fs = require('fs');

let readFiles = util.promisify(fs.readFile);

readFiles('./resource/content.txt').then(value => {
  console.log(value.toString());
}, reason => {
  console.log(reason);
});
