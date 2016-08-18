'use strict';

const openNeededStructures = require('./memory.openNeededStructures');
const sourcesAmounts = require('./memory.sourcesAmounts');

Room.prototype.isHeavyUpgradeable =
  function () {
    if (!openNeededStructures.isFinished(this.name)) {
      return;
    }
    if (!this.storage) {
      return;
    }
    return this.storage.isFull({ percentage: 0.75 });
  };

Room.prototype.hasNeighboringSpawnConstructionSite =
Room.prototype.getNeighboringSpawnConstructionSite =
  function () {
    let spawn;
    const exits = Game.map.describeExits(this.name);
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

Room.prototype.getSourcesAmount =
  function () {
    return sourcesAmounts.getSourcesAmount(this.name);
  };
