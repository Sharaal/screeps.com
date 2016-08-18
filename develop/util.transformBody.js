'use strict';

module.exports = body => {
  let parts = [];
  _.each(body, (amount, part) => {
    parts = parts.concat(Array.apply({}, Array(amount)).map(() => part));
  });
  return parts;
};
