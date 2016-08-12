'use strict';

module.exports.conditions = room => {
  return room.find(FIND_MY_CREEPS).length === 0;
};

var body = require('util.body');
module.exports.priorities = [
  {
    role: 'sourceRescuer',
    amount: 1,
    body: body({ carry: 1, move: 1, work: 2 })
  }
];
