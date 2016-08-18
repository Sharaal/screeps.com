'use strict';

const openBuildOrders = require('./memory.openBuildOrders');

function getNeededAmount(room, structureType, maxNeededAmount) {
  const controllerMaxAmount = CONTROLLER_STRUCTURES[structureType][room.controller.level];
  if (maxNeededAmount) {
    Math.min(controllerMaxAmount, maxNeededAmount);
  }
  return controllerMaxAmount;
}

function getNeededStructures(room) {
  const neededStructures = new Map();

  neededStructures.set(STRUCTURE_SPAWN,     getNeededAmount(room, STRUCTURE_SPAWN));
  neededStructures.set(STRUCTURE_EXTENSION, getNeededAmount(room, STRUCTURE_EXTENSION));
  neededStructures.set(STRUCTURE_TOWER,     getNeededAmount(room, STRUCTURE_TOWER));

  neededStructures.set(STRUCTURE_STORAGE,   getNeededAmount(room, STRUCTURE_STORAGE, room.getSourcesAmount()));
  neededStructures.set(STRUCTURE_CONTAINER, getNeededAmount(room, STRUCTURE_CONTAINER, room.getSourcesAmount() - structures[STRUCTURE_STORAGE]));

  return neededStructures;
}

function filterRoomObjects(room, neededStructures, FIND) {
  const filteredNeededStructures = new Map();
  neededStructures.forEach((neededAmount, neededStructureType) => {
    const availableRoomObjects = room.find(FIND, {
      filter: structure => structure.structureType === neededStructureType
    });
    neededAmount = neededAmount - availableRoomObjects.length;
    if (neededAmount > 0) {
      filteredNeededStructures.set(neededStructureType, neededAmount);
    }
  });
  return filteredNeededStructures;
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
  openBuildOrders.set(room.name, neededStructures);

  neededStructures = filterAvailableConstructionSites(room, neededStructures);
  if (neededStructures.length > 0) {
    console.log('------------------------------ ROOM NEEDED CONSTRUCTION SITES ------------------------------');
    console.log(room.name);
    neededStructures.forEach((neededAmount, neededStructureType) => {
      console.log(neededStructureType, neededAmount);
    });
    console.log('--------------------------------------------------------------------------------------------');
  }
};
