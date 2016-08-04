'use strict';

module.exports = (creep, results) => {
  var constructionSite = Game.getObjectById(creep.memory.constructionSite);
  if (creep.build(constructionSite) === ERR_NOT_IN_RANGE) {
    creep.moveTo(constructionSite);
  } else {
    if (creep.carry.energy === 0) {
      return results.FINISHED | results.NEXTTICK;
    }
  }
  return results.NEXTTICK;
};
