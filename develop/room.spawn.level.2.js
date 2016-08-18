'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');

module.exports.conditions = room => {
  return room.controller.level >= 2
         &&
         room.energyCapacityAvailable >= 550;
};

module.exports.bodies = {
  'sourcer': { carry: 1, move: 1, work: 4 },
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
    amount: room => room.getSourcesAmount()
  },
  {
    role: 'sourcer',
    amount: room => {
      let amount = 0;
      _.each(room.find(FIND_SOURCES), source => {
        amount += Math.min(harvestSourcePositions.getAmountBySource(source), 2);
      });
      return amount;
    }
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
