'use strict';

var creepController = require('./creep.controller');
var garbageCollector = require('./garbageCollector');
var roomController = require('./room.controller');
var time = require('./util.time');

var roles = {
  'flagClaimer':         require('./creep.role.flagClaimer'),

  'sourceAllrounder':    require('./creep.role.sourceAllrounder'),
  'sourceRescuer':       require('./creep.role.sourceRescuer'),
  'sourceUpgrader':      require('./creep.role.sourceUpgrader'),

  'storageBuilder':      require('./creep.role.storageBuilder'),
  'storageCarrier':      require('./creep.role.storageCarrier'),
  'storageSourcer':      require('./creep.role.storageSourcer'),
  'storageSpawnBuilder': require('./creep.role.storageSpawnBuilder'),
  'storageUpgrader':     require('./creep.role.storageUpgrader')
};

module.exports.loop = () => {
  if (time(100)) {
    garbageCollector();
  }
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, roomController(roles));
};
