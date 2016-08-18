'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 4
         &&
         room.energyCapacityAvailable >= 1300
};

module.exports.bodies = {
  'sourcer': { carry: 1, move: 1, work: 8 },
  'carrier': { carry: 2, move: 1 },
  'worker':  { carry: 1, move: 1, work: 1 }
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
    amount: room => room.getSourcesAmount()
  },
  {
    role: 'carrier',
    amount: room => room.getSourcesAmount() * 3
  },
  {
    role: 'worker',
    amount: room => room.getSourcesAmount() * 2
  }
];
