'use strict';

const body = require('util.body');

module.exports.conditions = spawn => {
  return spawn.room.controller.level >= 4 &&
         spawn.room.energyCapacityAvailable >= 1300 &&
         spawn.room
           .find(FIND_STRUCTURES, { filter: structure => structure.structureType == STRUCTURE_STORAGE })
           .length > 0;
};

module.exports.priorities = [
  {
    role: 'harvestSource-upgradeController',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 1 })
  },
  {
    role: 'harvestSource-transferEnergyStorage',
    amount: 1,
    body: body({ CARRY: 1, MOVE: 1, WORK: 12 })
  },
  {
    role: 'harvestEnergyStorage-transferStructure',
    amount: 1,
    body: body({ CARRY: 10, MOVE: 10 })
  },
  {
    role: 'harvestEnergyStorage-buildConstructionSite',
    amount: 1,
    body: body({ CARRY: 4, MOVE: 4, WORK: 4 })
  }
];
