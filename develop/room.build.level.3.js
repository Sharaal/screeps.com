'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 3;
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
      amount: 10
    },
    {
      structureType: STRUCTURE_TOWER,
      amount: 1
    }
  ];
};
