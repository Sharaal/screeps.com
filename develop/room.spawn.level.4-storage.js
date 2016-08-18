'use strict';

const level4 = require('./room.spawn.level.4');

module.exports.conditions = room => {
  return level4.conditions(room)
         &&
         room.hasStorage()
};

module.exports.bodies = level4.bodies;

module.exports.priorities = [
  {
    role: 'sourcer',
    amount: 1
  },
  {
    role: 'carrier',
    amount: 1
  },
  {
    role: 'worker',
    amount: 1
  },
  {
    role: 'sourcer',
    amount: room => room.find(FIND_SOURCES).length
  },
  {
    role: 'carrier',
    amount: room => room.find(FIND_SOURCES).length * 2
  }
];
