'use strict';

const body = require('util.body');

module.exports.conditions = room => {
  return room.controller.level >= 4 &&
         room.energyCapacityAvailable >= 1300 &&
         room
           .find(FIND_STRUCTURES, {
             filter: structure => structure.structureType == STRUCTURE_STORAGE
           })
           .length > 0;
};

module.exports.priorities = [
  {
    role: 'storage-sourcer',
    amount: 1,
    body: body({ move: 1, work: 8 })
  },
  {
    role: 'storage-carrier',
    amount: 1,
    body: body({ carry: 4, move: 4 })
  },
  {
    role: 'storage-upgrader',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'storage-sourcer',
    amount: room => room.find(FIND_SOURCES).length,
    body: body({ move: 1, work: 8 })
  },
  {
    role: 'storage-carrier',
    amount: room => room.find(FIND_SOURCES).length,
    body: body({ carry: 4, move: 4 })
  },
  {
    role: 'storage-builder',
    amount: 1,
    body: body({ carry: 4, move: 2, work: 2 })
  }
];
