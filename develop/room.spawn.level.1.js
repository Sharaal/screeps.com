'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');

module.exports.conditions = room => {
  return room.controller.level >= 1;
};

module.exports.bodies = {
  'sourcer': { carry: 1, move: 1, work: 2 },
  'carrier': { carry: 3, move: 3 },
  'worker':  { carry: 1, move: 1, work: 2 }
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
    amount: room => room.find(FIND_SOURCES).length
  },
  {
    role: 'sourcer',
    amount: room => {
      var amount = 0;
      _.each(room.find(FIND_SOURCES), source => {
        amount += Math.min(harvestSourcePositions.getAmountBySource(source), 4);
      });
      return amount;
    }
  },
  {
    role: 'carrier',
    amount: room => room.find(FIND_SOURCES).length * 2
  },
  {
    role: 'worker',
    amount: room => room.find(FIND_SOURCES).length
  }
];
