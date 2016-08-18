'use strict';

Room.prototype.hasStorage = Room.prototype.getStorage = function () {
  const storages = this.find(FIND_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_STORAGE });
  return storages[0];
};

Room.prototype.hasNeighboringSpawnConstructionSite = Room.prototype.getNeighboringSpawnConstructionSite = function () {
  let spawn;
  const exits = Game.map.describeExists(this.name);
  _.each(exits, roomName => {
    const room = Game.rooms[roomName];
    if (!room || !room.controller.my) {
      return;
    }
    const spawns = room.find(FIND_MY_CONSTRUCTION_SITES, {
      filter: constructionSite => constructionSite.structureType === STRUCTURE_SPAWN
    });
    if (spawns.length > 0) {
      spawn = spawns[0];
    }
  });
  return spawn;
};
