'use strict';

var attack = require('./tower.attack');
var repairStructure = require('./tower.repairStructure');
var repairWall = require('./tower.repairWall');

module.exports = tower => {
  if (tower.isEmpty()) {
    return;
  }
  if (attack(tower)) {
    return;
  }
  if (tower.isFull(0.5)) {
    if (repairStructure(tower)) {
      return;
    }
  }
  if (tower.isFull(0.75)) {
    if (repairWall(tower)) {
      return;
    }
  }
};
