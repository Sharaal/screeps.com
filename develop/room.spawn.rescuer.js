'use strict';

module.exports.conditions = room => {
  return room.find(FIND_MY_CREEPS).length === 0;
};

module.exports.bodies = {
  'rescuer': { carry: 1, move: 1, work: 2 }
};

module.exports.priorities = [
  {
    role: 'rescuer',
    amount: 1
  }
];
