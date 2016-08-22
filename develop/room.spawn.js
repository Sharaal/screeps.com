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
    let spawns = role.spawn(room);
    if (!spawns) {
      return;
    }
    if (!Array.isArray(spawns)) {
      spawns = [spawns];
    }
    _.each(spawns, spawn => {
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
          &&
          (!spawn.filter || spawn.filter(creep))
      };

      if (spawn.mapAmount) {
        const mapCreeps = _.filter(Game.creeps, opts.filter);
        if (mapCreeps.length >= spawn.mapAmount) {
          return;
        }
      }

      const roomCreeps = room.find(FIND_MY_CREEPS, opts);
      const roomAmount = roomCreeps.length;
      if (spawn.roomAmount) {
        if (roomAmount >= spawn.roomAmount) {
          return;
        }
      }

      let priority;
      if (spawn.priority) {
        if (typeof spawn.priority === 'function') {
          priority = spawn.priority(roomAmount);
        } else {
          priority = spawn.priority;
        }
      }

      if (spawnOrder
          &&
          spawnOrder.priority
          &&
          (!priority || priority <= spawnOrder.priority)) {
        return;
      }

      spawnOrder = {
        priority: priority,
        body: transformBody(spawn.body),
        memory: { role: roleName, activity: Object.keys(role.activities)[0] }
      };
      if (spawn.memory) {
        spawnOrder.memory = Object.assign({}, spawn.memory, spawnOrder.memory);
      }
    });
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
