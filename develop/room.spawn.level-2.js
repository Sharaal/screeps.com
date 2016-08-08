'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 2 &&
         room.energyCapacityAvailable >= 550;
};

var body = require('util.body');
module.exports.priorities = [
  {
    role: 'harvestSource-allround',
    amount: 1,
    body: body({ carry: 3, move: 2, work: 3 })
  },
  {
    role: 'harvestSource-upgradeController',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'harvestSource-allround',
    amount: 5,
    body: body({ carry: 3, move: 2, work: 3 })
  }
];
