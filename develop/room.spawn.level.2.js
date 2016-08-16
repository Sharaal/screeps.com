'use strict';

var body = require('./util.body');
var harvestSourcePositions = require('./memory.harvestSourcePositions');

module.exports.conditions = room => {
  return room.controller.level >= 2
         &&
         room.energyCapacityAvailable >= 550;
};

module.exports.priorities = [
  {
    role: 'sourceAllrounder',
    amount: 1,
    body: body({ carry: 3, move: 2, work: 3 })
  },
  {
    role: 'sourceUpgrader',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'sourceAllrounder',
    amount: room => harvestSourcePositions.getAmountByRoomName(room.name) * 2,
    body: body({ carry: 3, move: 2, work: 3 })
  }
];
