'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 2 &&
         room.energyCapacityAvailable >= 550;
};

var body = require('util.body');
module.exports.priorities = [
  {
    role: 'source-allrounder',
    amount: 1,
    body: body({ carry: 3, move: 2, work: 3 })
  },
  {
    role: 'source-upgrader',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'source-allrounder',
    amount: room => room.find(FIND_SOURCES).length * 5,
    body: body({ carry: 3, move: 2, work: 3 })
  }
];
