'use strict';

module.exports.conditions = {
  level: 1,
};

module.exports.priorities = [
  {
    role: 'transferer',
    amount: 1,
    body: [WORK, WORK, CARRY, MOVE]
  },
  {
    role: 'upgrader',
    amount: 1,
    body: [WORK, WORK, CARRY, MOVE]
  },
  {
    role: 'transferer',
    amount: 3,
    body: [WORK, WORK, CARRY, MOVE]
  },
  {
    role: 'builder',
    amount: 3,
    body: [WORK, WORK, CARRY, MOVE]
  },
];
