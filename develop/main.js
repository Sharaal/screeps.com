'use strict';

require('./prototype.Creep');
require('./prototype.Room');
require('./prototype.RoomObject');
require('./prototype.StructureTower');

var creepController = require('./creep.controller');
var garbageCollector = require('./garbageCollector');
var migration = require('./migration');
var roomController = require('./room.controller');
var time = require('./util.time');

var roles = {
  'carrier':      require('./creep.role.carrier'),
  'flagClaimer':  require('./creep.role.flagClaimer'),
  'rescuer':      require('./creep.role.rescuer'),
  'sourcer':      require('./creep.role.sourcer'),
  'spawnBuilder': require('./creep.role.spawnBuilder'),
  'worker':       require('./creep.role.worker')
};

module.exports.loop = () => {
  migration(roles);
  if (time(100)) {
    garbageCollector();
  }
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, roomController(roles));
};
