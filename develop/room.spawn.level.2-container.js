'use strict';

var body = require('./util.body');
var harvestSourcePositions = require('./memory.harvestSourcePositions');

module.exports.conditions = room => {
  return room.controller.level >= 2
         &&
         room.energyCapacityAvailable >= 550
         &&
         room
           .find(FIND_MY_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_CONTAINER })
           .length > 0;
};

module.exports.priorities = [
  {
    role: 'storageSourcer',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 4 })
  },
  {
    role: 'storageCarrier',
    amount: 1,
    body: body({ carry: 3, move: 3 })
  },
  {
    role: 'storageUpgrader',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'storageSourcer',
    amount: room => {
      var amount = 0;
      _.each(room.find(FIND_SOURCES), source => {
        amount += Math.min(harvestSourcePositions.getAmountBySource(source), 2);
      });
      return amount;
    },
    body: body({ carry: 1, move: 1, work: 4 })
  },
  {
    role: 'storageCarrier',
    amount: room => room.find(FIND_SOURCES).length * 2,
    body: body({ carry: 3, move: 3 })
  },
  {
    role: 'storageBuilder',
    amount: 1,
    body: body({ carry: 3, move: 3, work: 2 })
  }
];
