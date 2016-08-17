'use strict';

var levels = [
  require('./room.build.level.1'),
  require('./room.build.level.2'),
  require('./room.build.level.3'),
  require('./room.build.level.4'),
  require('./room.build.level.5'),
  require('./room.build.level.6'),
  require('./room.build.level.7'),
  require('./room.build.level.8')
];

module.exports = room => {
  var neededStructures;
  _.each(levels, level => {
    if (!level.conditions(room)) {
      return;
    }
    neededStructures = level.structures(room);
  });
  if (!neededStructures) {
    return;
  }

  var orders = [];
  _.each(neededStructures, neededStructure => {
    var availableStructures = room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType == neededStructure.structureType
    });
    var availableConstructionSites = room.find(FIND_CONSTRUCTION_SITES, {
      filter: constructionSite => constructionSite.structureType == neededStructure.structureType
    });
    var neededAmount = neededStructure.amount - (availableStructures.length + availableConstructionSites.length);
    if (neededAmount > 0) {
      orders.push({ structureType: neededStructure.structureType, amount: neededAmount });
    }
  });

  if (orders.length) {
    console.log('------------------------------ ROOM BUILD ORDERS ------------------------------');
    console.log(room.name);
    console.log(JSON.stringify(orders));
    console.log('-------------------------------------------------------------------------------');
  }
};
