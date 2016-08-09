'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 1;
};

var body = require('util.body');
module.exports.priorities = [
  {
    role: 'harvestSource-allround',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 2 })
  },
  {
    role: 'harvestSource-upgradeController',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'harvestSource-allround',
    amount: 7,
    body: body({ carry: 1, move: 1, work: 2 })
  }
];
