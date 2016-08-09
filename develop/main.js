'use strict';

var memory = require('./memory');
var creepController = require('./creep.controller');
var roomController = require('./room.controller');
var time = require('./util.time');

var roles = _.merge(
  {},
  require('./creep.role.carrier'),
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
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, roomController(roles));
};
