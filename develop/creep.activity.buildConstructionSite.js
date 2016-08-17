'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');

function find(creep) {
  return creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
}

module.exports = (next, harvest) => creep => {
  if (creep.isEmpty()) {
    return harvest;
  }
  var constructionSite = creep.getMemoryObject('buildConstructionSite', find);
  if (!constructionSite) {
    return next;
  }
  creep.moveToOr('build', constructionSite);
};
