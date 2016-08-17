'use strict';

var level4 = require('./room.spawn.level.4');

module.exports.conditions = room => {
  var storage;
  return level4.conditions(room)
         &&
         (storage = room.getStorage())
         &&
         storage.isFull(0.75);
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
    role: 'sourcer',
    amount: room => room.find(FIND_SOURCES).length
  },
  {
    role: 'carrier',
    amount: room => room.find(FIND_SOURCES).length * 2
  },
  {
    role: 'worker',
    amount: undefined
  }
];
