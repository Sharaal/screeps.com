'use strict';

require('./prototype.Creep');
require('./prototype.Room');
require('./prototype.RoomObject');
require('./prototype.StructureTower');

const creepController = require('./creep.controller');
const garbageCollector = require('./garbageCollector');
const migration = require('./migration');
const roles = require('./creep.roles');
const roomController = require('./room.controller');
const time = require('./util.time');

module.exports.loop = () => {
  migration(roles);
  if (time(100)) {
    garbageCollector.garbageCollect();
  }
  _.each(Game.creeps, creepController(roles));
  _.each(_.filter(Game.rooms, room => room.controller.my), roomController(roles));
};
