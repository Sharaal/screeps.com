'use strict';

const body = require('util.body');

module.exports.conditions = {
  level: 2,
  energyCapacityAvailable: 550,
};

module.exports.priorities = [
  {
    role: 'transferer',
    amount: 1,
    body: body({ CARRY: 3, MOVE: 2, WORK: 3 })
  },
  {
    role: 'upgrader',
    amount: 1,
    body: body({ CARRY: 3, MOVE: 2, WORK: 3 })
  },
  {
    role: 'transferer',
    amount: 4,
    body: body({ CARRY: 3, MOVE: 2, WORK: 3 })
  },
  {
    role: 'builder',
    amount: 2,
    body: body({ CARRY: 3, MOVE: 2, WORK: 3 })
  },
];
