'use strict';

var body = require('./util.body');

module.exports.conditions = room => {
  var storages = room.find(FIND_MY_STRUCTURES, {
    filter: structure => structure.structureType == STRUCTURE_STORAGE
  });
  return room.controller.level >= 4
         &&
         room.energyCapacityAvailable >= 1300
         &&
         storages.length > 0
         &&
         (((storages[0].store.energy || 0) + (storages[0].store.L || 0)) / storages[0].storeCapacity) >= 0.75;
};

module.exports.priorities = [
  {
    role: 'storageSourcer',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 8 })
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
    amount: room => room.find(FIND_SOURCES).length,
    body: body({ carry: 1, move: 1, work: 8 })
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
  },
  {
    role: 'storageUpgrader',
    amount: 5,
    body: body({ carry: 8, move: 4, work: 6 })
  },
];
