'use strict';

var towerController = require('./tower.controller');

module.exports = room => {
  var towers = room.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_TOWER });
  _.each(towers, towerController);
};
