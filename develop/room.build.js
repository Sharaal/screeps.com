'use strict';

const openNeededStructures = require('./memory.openNeededStructures');

function getNeededAmount(room, structureType, maxNeededAmount) {
  const controllerMaxAmount = CONTROLLER_STRUCTURES[structureType][room.controller.level];
  if (typeof maxNeededAmount === 'number') {
    return Math.min(controllerMaxAmount, maxNeededAmount);
  }
  return controllerMaxAmount;
}

function getNeededStructures(room) {
  const neededStructures = {};

  neededStructures[STRUCTURE_SPAWN]     = getNeededAmount(room, STRUCTURE_SPAWN);
  neededStructures[STRUCTURE_EXTENSION] = getNeededAmount(room, STRUCTURE_EXTENSION);
  neededStructures[STRUCTURE_TOWER]     = getNeededAmount(room, STRUCTURE_TOWER);

  neededStructures[STRUCTURE_STORAGE]   = getNeededAmount(room, STRUCTURE_STORAGE, room.getSourcesAmount());
  neededStructures[STRUCTURE_CONTAINER] = getNeededAmount(room, STRUCTURE_CONTAINER, room.getSourcesAmount() - neededStructures[STRUCTURE_STORAGE]);

  return neededStructures;
}

function filterRoomObjects(room, neededStructures, FIND) {
  return _.each(neededStructures, (neededAmount, neededStructureType) => {
    const availableRoomObjects = room.find(FIND, {
      filter: structure => structure.structureType === neededStructureType
    });
    neededStructures[neededStructureType] = Math.max(neededAmount - availableRoomObjects.length, 0);
  });
}

function filterAvailableStructures(room, neededStructures) {
  return filterRoomObjects(room, neededStructures, FIND_STRUCTURES);
}

function filterAvailableConstructionSites(room, neededStructures) {
  return filterRoomObjects(room, neededStructures, FIND_MY_CONSTRUCTION_SITES);
}

module.exports = room => {
  let neededStructures = getNeededStructures(room);

  neededStructures = filterAvailableStructures(room, neededStructures);
  openNeededStructures.setNeededStructures(room.name, neededStructures);

  neededStructures = filterAvailableConstructionSites(room, neededStructures);
  if (_.sum(neededStructures) > 0) {
    console.log('------------------------------ ROOM NEEDED CONSTRUCTION SITES ------------------------------');
    console.log(room.name);
    _.each(neededStructures, (neededAmount, neededStructureType) => {
      console.log(neededStructureType, neededAmount);
    });
    console.log('--------------------------------------------------------------------------------------------');
  }
};
