'use strict';

var openBuildOrders = require('./memory.openBuildOrders');

function getNeededAmount(room, structureType, maxNeededAmount) {
  var controllerMaxAmount = CONTROLLER_STRUCTURES[structureType][room.controller.level];
  if (maxNeededAmount) {
    Math.min(controllerMaxAmount, maxNeededAmount);
  }
  return controllerMaxAmount;
}

function getNeededStructures(room) {
  var neededStructures = {};
  neededStructures[STRUCTURE_SPAWN]     = getNeededAmount(room, STRUCTURE_SPAWN);
  neededStructures[STRUCTURE_EXTENSION] = getNeededAmount(room, STRUCTURE_EXTENSION);
  neededStructures[STRUCTURE_TOWER]     = getNeededAmount(room, STRUCTURE_TOWER);
  neededStructures[STRUCTURE_STORAGE]   = getNeededAmount(room, STRUCTURE_STORAGE, room.find(FIND_SOURCES).length);
  neededStructures[STRUCTURE_CONTAINER] = getNeededAmount(room, STRUCTURE_CONTAINER, room.find(FIND_SOURCES).length - structures[STRUCTURE_STORAGE]);
  return neededStructures;
}

function filterAvailableStructures(room, neededStructures) {
  var filteredNeededStructures = {};
  _.each(neededStructures, (neededAmount, neededStructureType) => {
    var availableStructures = room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType === neededStructureType
    });
    neededAmount = neededAmount - availableStructures.length;
    if (neededAmount > 0) {
      filteredNeededStructures[neededStructureType] = neededAmount;
    }
  });
  return filteredNeededStructures;
}

function filterAvailableConstructionSites(room, neededStructures) {
  var filteredNeededStructures = {};
  _.each(neededStructures, (neededAmount, neededStructureType) => {
    var availableConstructionSites = room.find(FIND_MY_CONSTRUCTION_SITES, {
      filter: constructionSite => constructionSite.structureType === neededStructureType
    });
    neededAmount = neededAmount - availableConstructionSites.length;
    if (neededAmount > 0) {
      filteredNeededStructures[neededStructureType] = neededAmount;
    }
  });
  return filteredNeededStructures;
}

module.exports = room => {
  var neededStructures = getNeededStructures(room);

  neededStructures = filterAvailableStructures(room, neededStructures);
  openBuildOrders.set(room.name, neededStructures);

  neededStructures = filterAvailableConstructionSites(room, neededStructures);
  if (Object.keys(neededStructures).length) {
    console.log('------------------------------ ROOM NEEDED CONSTRUCTION SITES ------------------------------');
    console.log(room.name);
    console.log(JSON.stringify(neededStructures));
    console.log('--------------------------------------------------------------------------------------------');
  }
};
