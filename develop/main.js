'use strict';

var memory = require('./memory');
var spawnController = require('./spawn.controller');
var creepController = require('./creep.controller');

var roles = {
  builder: require('./creep.role.builder'),
  transferer: require('./creep.role.transferer'),
  upgrader: require('./creep.role.upgrader')
};

module.exports.loop = () => {
  memory();
  spawnController(roles);
  _.each(Game.creeps, creepController(roles));
};
