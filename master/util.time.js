'use strict';

module.exports = amount => {
  return Game.time % amount === 0;
};
