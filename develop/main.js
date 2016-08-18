'use strict';

require('./prototype.Creep');
require('./prototype.Room');
require('./prototype.RoomObject');
require('./prototype.StructureTower');

const creepController = require('./creep.controller');
const garbageCollector = require('./garbageCollector');
const migration = require('./migration');
const roomController = require('./room.controller');
const time = require('./util.time');

const roles = {
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
    garbageCollector.garbageCollect();
  }
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, roomController(roles));
};
