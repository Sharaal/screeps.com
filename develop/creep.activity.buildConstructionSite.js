'use strict';

var harvestSourcePositions = require('./memory.harvestSourcePositions');
var memoryObject = require('./util.memoryObject');

function find(creep) {
  return creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
}

module.exports = (next, harvest) => creep => {
  if (creep.carry.energy === 0) {
    return harvest;
  }
  var constructionSite = memoryObject(creep, 'buildConstructionSite', find);
  if (!constructionSite) {
    return next;
  }
  var source = harvestSourcePositions.getSource(creep.pos);
  if (source) {
    creep.moveAwayFrom(source);
  } else {
    if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
      creep.moveTo(constructionSite);
    }
  }
};
