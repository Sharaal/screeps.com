'use strict';

function transformBody(body) {
  let bodyparts = [];
  _.each(body, (bodypartAmount, bodypartName) => {
    bodyparts = bodyparts.concat(Array.apply({}, Array(bodypartAmount)).map(() => bodypartName));
  });
  return bodyparts;
};

module.exports = roles => room => {
  var spawnOrder;
  _.each(roles, (role, roleName) => {
    if (spawnOrder) {
      return;
    }

    const spawn = role.spawn(room);
    if (!spawn) {
      return;
    }

    let costsToSpawn = 0;
    _.each(spawn.body, (bodypartAmount, bodypartName) => {
      costsToSpawn += BODYPART_COST[bodypartName];
    });
    if (costsToSpawn > room.energyCapacityAvailable) {
      return;
    }

    const ticksToSpawn = _.sum(spawn.body) * CREEP_SPAWN_TIME;
    const opts = {
      filter: creep =>
        creep.memory.role === roleName
        &&
        creep.ticksToLive >= ticksToSpawn
    };

    if (spawn.mapAmount) {
      const mapCreeps = _.filter(Game.creeps, opts.filter);
      if (mapCreeps.length >= spawn.mapAmount) {
        return;
      }
    }

    if (spawn.roomAmount) {
      const roomCreeps = room.find(FIND_MY_CREEPS, opts);
      if (roomCreeps.length >= spawn.roomAmount) {
        return;
      }
    }

    spawnOrder = {
      body: transformBody(spawn.body),
      memory: { role: roleName, activity: Object.keys(role.activities)[0] }
    };
  });
  if (!spawnOrder) {
    return;
  }

  const spawns = room.find(FIND_MY_STRUCTURES, { filter: structure => structure.structureType === STRUCTURE_SPAWN });
  _.each(spawns, spawn => {
    if (!spawnOrder) {
      return;
    }
    if (spawn.createCreep(spawnOrder.body, undefined, spawnOrder.memory) !== OK) {
      return;
    }
    spawnOrder = undefined;
  });
};
