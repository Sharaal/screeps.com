'use strict';

function find(creep) {
  return creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
}

module.exports = (next, empty) => creep => {
  if (creep.isEmpty()) {
    return empty;
  }
  var constructionSite = creep.getMemoryObject('buildConstructionSite', find);
  if (!constructionSite) {
    return next;
  }
  creep.moveToAnd('build', constructionSite);
};
