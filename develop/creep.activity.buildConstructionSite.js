'use strict';

var memoryObject = require('util.MemoryObject');

function find(creep) {
  return creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
}

module.exports = (next, harvest) => creep => {
  if (creep.carry.energy === 0) {
    return harvest;
  }
  var constructionSite = memoryObject(creep, 'buildConstructionSite', find);
  if (!constructionSite) {
    return next;
  }
  if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSite);
  }
};
