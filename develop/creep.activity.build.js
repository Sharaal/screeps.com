'use strict';

module.exports = creep => {
  var constructionSite = Game.getObjectById(creep.memory.constructionSite);
  var energy = creep.carry.energy;
  if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSite);
    return;
  }
  if (creep.carry.energy === energy || creep.carry.energy === 0) {
    return true;
  }
};
