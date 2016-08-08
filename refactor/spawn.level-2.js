'use strict';

module.exports.conditions = spawn => {
  return spawn.room.controller.level >= 2 &&
         spawn.room.energyCapacityAvailable >= 550;
};

var body = require('util.body');
module.exports.priorities = [
  {
    role: 'harvestSource-allround',
    amount: 1,
    body: body({ CARRY: 3, MOVE: 2, WORK: 3 })
  },
  {
    role: 'harvestSource-upgradeController',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 1 })
  },
  {
    role: 'harvestSource-allround',
    amount: 5,
    body: body({ CARRY: 3, MOVE: 2, WORK: 3 })
  }
];
