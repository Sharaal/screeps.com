'use strict';

module.exports = creep => {
  var constructionSite = Game.getObjectById(creep.memory.constructionSite);
  var before = creep.carry.energy;
  creep.build(constructionSite);
  if (creep.carry.energy === before || creep.carry.energy === 0) {
    return true;
  }
};
