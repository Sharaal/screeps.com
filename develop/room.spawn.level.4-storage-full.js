'use strict';

const level4 = require('./room.spawn.level.4');

module.exports.conditions = room => {
  let storage;
  return level4.conditions(room)
         &&
         (storage = room.getStorage())
         &&
         storage.isFull({ percentage: 0.75 });
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
    amount: room => room.getSourcesAmount()
  },
  {
    role: 'carrier',
    amount: room => room.getSourcesAmount() * 3
  },
  {
    role: 'worker',
    amount: undefined
  }
];
