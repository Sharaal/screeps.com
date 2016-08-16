'use strict';

require('./prototype.creep.moveAwayFrom');

var creepController = require('./creep.controller');
var garbageCollector = require('./garbageCollector');
var migration = require('./migration');
var roomController = require('./room.controller');
var time = require('./util.time');

var roles = {
  'flagClaimer':         require('./creep.role.flagClaimer'),
  'rescuer':             require('./creep.role.rescuer'),

  'sourceAllrounder':    require('./creep.role.sourceAllrounder'),
  'sourceUpgrader':      require('./creep.role.sourceUpgrader'),

  'storageBuilder':      require('./creep.role.storageBuilder'),
  'storageCarrier':      require('./creep.role.storageCarrier'),
  'storageSourcer':      require('./creep.role.storageSourcer'),
  'storageSpawnBuilder': require('./creep.role.storageSpawnBuilder'),
  'storageUpgrader':     require('./creep.role.storageUpgrader')
};

module.exports.loop = () => {
  migration(roles);
  if (time(100)) {
    garbageCollector();
  }
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, roomController(roles));
};
