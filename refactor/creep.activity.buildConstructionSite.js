'use strict';

function findConstructionSite(creep) {
  return creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
}

function getConstructionSite(creep) {
  var constructionSite;
  if (!creep.memory.constructionSite
      || !(constructionSite = Game.getObjectById(creep.memory.constructionSite))) {
    constructionSite = findConstructionSite(creep);
  }
  if (!constructionSite) {
    delete creep.memory.constructionSite;
    return;
  }
  creep.memory.constructionSite = constructionSite.id;
  return constructionSite;
}

module.exports = creep => {
  var constructionSite = getConstructionSite(creep);
  if (!constructionSite) {
    return true;
  }
  if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSite);
    return;
  }
  if (creep.carry.energy === 0) {
    delete creep.memory.constructionSite;
    return true;
  }
};
