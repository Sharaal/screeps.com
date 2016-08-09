'use strict';

var memory = require('./memory');
var creepController = require('./creep.controller');
var roomController = require('./room.controller');
var time = require('./util.time');

var roles = _.merge(
  {},

  require('./creep.role.sourceAllrounder'),
  require('./creep.role.sourceUpgrader'),

  require('./creep.role.storageBuilder'),
  require('./creep.role.storageCarrier'),
  require('./creep.role.storageSourcer'),
  require('./creep.role.storageUpgrader')
);

module.exports.loop = () => {
  if (time(100)) {
    memory();
  }
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, roomController(roles));
};
