'use strict';

module.exports.conditions = room => {
  return room.controller.level >= 4;
};

module.exports.structures = room => {
  return [
    {
      structureType: STRUCTURE_SPAWN,
      amount: 1
    },
    {
      structureType: STRUCTURE_CONTAINER,
      amount: room.find(FIND_SOURCES).length - 1
    },
    {
      structureType: STRUCTURE_EXTENSION,
      amount: 20
    },
    {
      structureType: STRUCTURE_TOWER,
      amount: 1
    },
    {
      structureType: STRUCTURE_STORAGE,
      amount: 1
    }
  ];
};
