'use strict';

module.exports.conditions = spawn => {
  return spawn.room.controller.level >= 1;
};

var body = require('util.body');
module.exports.priorities = [
  {
    role: 'harvestSource-allround',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 2 })
  },
  {
    role: 'harvestSource-upgradeController',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 1 })
  },
  {
    role: 'harvestSource-allround',
    amount: 7,
    body: body({ CARRY: 1, MOVE: 1, WORK: 2 })
  }
];
