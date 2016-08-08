'use strict';

function run(creep) {
  var constructionSite;
  if (!creep.memory.constructionSite ||
      !(constructionSite = Game.getObjectById(creep.memory.constructionSite))) {
    constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  }
  if (!constructionSite) {
    delete creep.memory.constructionSite;
    return true;
  }
  if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSite);
  } else {
    if (creep.carry.energy === 0) {
      delete creep.memory.constructionSite;
      return true;
    }
  }
  creep.memory.constructionSite = constructionSite.id;
}

module.exports = (next, harvest) => {
  return {
    buildConstructionSite: {
      run,
      next: creep => creep.carry.energy > 0 ? next : harvest
    }
  };
};
