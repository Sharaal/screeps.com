'use strict';

Room.prototype.hasStorage = Room.prototype.getStorage = function () {
  var storages = this.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_STORAGE });
  return storages[0];
};

Room.prototype.hasNeighboringSpawnConstructionSite = Room.prototype.getNeighboringSpawnConstructionSite = function () {
  var spawn;
  var exits = Game.map.describeExists(this.name);
  _.each(exits, roomName => {
    var room = Game.rooms[roomName];
    if (!room || !room.controller.my) {
      return;
    }
    var spawns = room.find(FIND_MY_CONSTRUCTION_SITES, {
      filter: constructionSite => constructionSite.structureType === STRUCTURE_SPAWN
    });
    if (spawns.length > 0) {
      spawn = spawns[0];
    }
  });
  return spawn;
};
