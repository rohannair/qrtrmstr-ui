const autoprefixer = require('autoprefixer');
const precss       = require('precss');
const rucksack     = require('rucksack-css');

module.exports = function() {
  return [
    rucksack({
      autoprefixer: true
    }),
    precss
  ];
};
