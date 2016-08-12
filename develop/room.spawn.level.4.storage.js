'use strict';

const body = require('util.body');

module.exports.conditions = room => {
  return room.controller.level >= 4
         &&
         room.energyCapacityAvailable >= 1300
         &&
         room
           .find(FIND_MY_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_STORAGE })
           .length > 0;
};

module.exports.priorities = [
  {
    role: 'sourceAllrounder',
    amount: room => (room.find(FIND_MY_CREEPS).length === 0) ? 1 : 0,
    body: body({ carry: 1, move: 1, work: 2 })
  },
  {
    role: 'storageUpgrader',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'storageSourcer',
    amount: 1,
    body: body({ move: 1, work: 8 })
  },
  {
    role: 'storageCarrier',
    amount: 2,
    body: body({ carry: 3, move: 3 })
  },
  {
    role: 'storageSourcer',
    amount: room => room.find(FIND_SOURCES).length,
    body: body({ move: 1, work: 8 })
  },
  {
    role: 'storageCarrier',
    amount: room => room.find(FIND_SOURCES).length * 2,
    body: body({ carry: 3, move: 3 })
  },
  {
    role: 'storageBuilder',
    amount: 1,
    body: body({ carry: 4, move: 2, work: 2 })
  },
  {
    role: 'flagClaimer',
    globalAmount: 1,
    body: body({ claim: 1, move: 4 })
  },
  {
    role: 'storageSpawnBuilder',
    globalAmount: 1,
    body: body({ carry: 12, move: 6, work: 2 })
  }
];
