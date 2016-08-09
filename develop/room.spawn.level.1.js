'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 1;
};

var body = require('util.body');
module.exports.priorities = [
  {
    role: 'sourceAllrounder',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 2 })
  },
  {
    role: 'sourceUpgrader',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 1 })
  },
  {
    role: 'sourceAllrounder',
    amount: room => room.find(FIND_SOURCES).length * 7,
    body: body({ carry: 1, move: 1, work: 2 })
  }
];
