'use strict';

const body = require('util.body');

module.exports.conditions = spawn => {
  return spawn.room.controller.level >= 4 &&
         spawn.room.energyCapacityAvailable >= 1300;
};

module.exports.priorities = [
  {
    role: 'storeUpgrader',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 1 })
  },
  {
    role: 'miner',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 12 })
  },
  {
    role: 'storeTransferer',
    amount: 1,
    body: body({ CARRY: 10, MOVE: 10 })
  },
  {
    role: 'storeBuilder',
    amount: 1,
    body: body({ CARRY: 4, MOVE: 4, WORK: 4 })
  },
];
