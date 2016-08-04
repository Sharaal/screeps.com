'use strict';

module.exports = (creep, results) => {
  var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  if (constructionSite) {
    creep.memory.constructionSite = constructionSite.id;
  }
  return results.FINISHED;
};
