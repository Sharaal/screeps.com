'use strict';

module.exports = tower => {
  if (tower.isEmpty()) {
    return;
  }
  if (tower.attackHostile()) {
    return;
  }
  if (tower.isFull(0.5)) {
    if (tower.repairStructure()) {
      return;
    }
  }
  if (tower.isFull(0.75)) {
    if (tower.repairWall()) {
      return;
    }
  }
};
