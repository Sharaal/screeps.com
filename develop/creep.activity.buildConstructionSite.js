'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
}

module.exports = (next, needEnergy) => creep => {
  if (creep.isEmpty()) {
    return needEnergy;
  }
  var constructionSite = creep.getMemoryObject('buildConstructionSite', find);
  if (!constructionSite) {
    return next;
  }
  creep.moveToOr('build', constructionSite);
};
