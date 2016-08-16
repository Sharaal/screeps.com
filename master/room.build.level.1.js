'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 1;
};

module.exports.structures = [
  {
    structureType: STRUCTURE_SPAWN,
    amount: 1
  }
];
