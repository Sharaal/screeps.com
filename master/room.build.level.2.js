'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 2;
};

module.exports.structures = room => {
  return [
    {
      structureType: STRUCTURE_SPAWN,
      amount: 1
    },
    {
      structureType: STRUCTURE_CONTAINER,
      amount: room.find(FIND_SOURCES).length
    },
    {
      structureType: STRUCTURE_EXTENSION,
      amount: 5
    }
  ];
};
