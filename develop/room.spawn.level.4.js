'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 4
         &&
         room.energyCapacityAvailable >= 1300
};

module.exports.bodies = {
  'sourcer': { carry: 1, move: 1, work: 8 },
  'carrier': { carry: 3, move: 3 },
  'worker':  { carry: 3, move: 2, work: 3 }
};

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
    amount: room => room.find(FIND_SOURCES).length * 2
  }
];
