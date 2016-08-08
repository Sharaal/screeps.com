'use strict';

var memory = require('./memory');
var spawnController = require('./spawn.controller');
var creepController = require('./creep.controller');
var towerController = require('./tower.controller');
var time = require('./util.time');

var roles = _.merge(
  {},
  require('./creep.role.harvestEnergyStorage-buildConstructionSite'),
  require('./creep.role.harvestEnergyStorage-transferStructure'),
  require('./creep.role.harvestEnergyStorage-upgradeController'),
  require('./creep.role.harvestSource-allround'),
  require('./creep.role.harvestSource-transferEnergyStorage'),
  require('./creep.role.harvestSource-upgradeController')
);

module.exports.loop = () => {
  if (time(100)) {
    memory();
  }
  if (time(10)) {
    _.each(Game.spawns, spawnController(roles));
  }
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, room => {
    var towers = room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType == STRUCTURE_TOWER
    });
    _.each(towers, towerController);
  });
};
