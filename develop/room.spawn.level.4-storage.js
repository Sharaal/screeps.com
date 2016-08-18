'use strict';

var level4 = require('./room.spawn.level.4');

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
  },
  {
    role: 'worker',
    amount: room => {
      if (room.find(FIND_MY_CONSTRUCTION_SITES).length > 0) {
        return 1;
      }
      return 0;
    }
  }
];
