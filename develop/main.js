'use strict';

var memory = require('./memory');
var creepController = require('./creep.controller');
var roomController = require('./room.controller');
var time = require('./util.time');

var roles = _.merge(
  {},

  require('./creep.role.source-allrounder'),
  require('./creep.role.source-upgrader'),

  require('./creep.role.storage-builder'),
  require('./creep.role.storage-carrier'),
  require('./creep.role.storage-sourcer'),
  require('./creep.role.storage-upgrader')
);

module.exports.loop = () => {
  if (time(100)) {
    memory();
  }
  _.each(Game.creeps, creepController(roles));
  _.each(Game.rooms, roomController(roles));
};
