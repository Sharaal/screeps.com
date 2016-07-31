'use strict';

module.exports.conditions = {
  level: 2,
  energyCapacityAvailable: 550,
};

module.exports.priorities = [
  {
    role: 'transferer',
    amount: 1,
    body: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
  },
  {
    role: 'upgrader',
    amount: 1,
    body: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
  },
  {
    role: 'transferer',
    amount: 4,
    body: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
  },
  {
    role: 'builder',
    amount: 2,
    body: [WORK, WORK,  WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
  },
];
