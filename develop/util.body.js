'use strict';

module.exports = body => {
  var parts = [];
  _.each(body, (amount, part) => {
    parts = parts.concat(Array.apply({}, Array(amount)).map(() => part));
  });
  return parts;
};
