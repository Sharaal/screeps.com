'use strict';

var memory = require('./memory');
var spawnController = require('./spawn.controller');
var creepController = require('./creep.controller');

module.exports.loop = () => {
  memory();
  _.each(Game.spawns, spawnController);
  _.each(Game.creeps, creepController);
};
