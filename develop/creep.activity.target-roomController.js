'use strict';

module.exports = creep => {
  creep.memory.target = 'roomController';
  creep.memory.range = 3;
  return true;
};
