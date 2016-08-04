'use strict';

const body = require('util.body');

module.exports.conditions = {
  level: 1,
};

module.exports.priorities = [
  {
    role: 'transferer',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 2 })
  },
  {
    role: 'upgrader',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 2 })
  },
  {
    role: 'transferer',
    amount: 3,
    body: body({ CARRY: 1, MOVE: 1, WORK: 2 })
  },
  {
    role: 'builder',
    amount: 2,
    body: body({ CARRY: 1, MOVE: 1, WORK: 2 })
  },
];
