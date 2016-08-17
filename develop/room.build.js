'use strict';

var openBuildOrders = require('./memory.openBuildOrders');
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

  var newBuildOrders = [];
  var buildOrders = [];
  _.each(neededStructures, neededStructure => {
    var availableStructures = room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType === neededStructure.structureType
    });
    var amount = neededStructure.amount - availableStructures.length;
    if (amount > 0) {
      buildOrders.push({ structureType: neededStructure.structureType, amount: amount });
    }
    var availableConstructionSites = room.find(FIND_CONSTRUCTION_SITES, {
      filter: constructionSite => constructionSite.structureType === neededStructure.structureType
    });
    var newAmount = neededStructure.amount - (availableStructures.length + availableConstructionSites.length);
    if (newAmount > 0) {
      newBuildOrders.push({ structureType: neededStructure.structureType, amount: newAmount });
    }
  });

  if (newBuildOrders.length) {
    console.log('------------------------------ ROOM NEW BUILD ORDERS ------------------------------');
    console.log(room.name);
    console.log(JSON.stringify(newBuildOrders));
    console.log('-------------------------------------------------------------------------------');
  }

  openBuildOrders.set(room.name, buildOrders);
};
