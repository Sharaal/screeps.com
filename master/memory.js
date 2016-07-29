'use strict';

function memory() {
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
    }
  }
  for (var name in Memory.spawns) {
    if (!Game.spawns[name]) {
      delete Memory.spawns[name];
    }
  }
}

module.exports = memory;
