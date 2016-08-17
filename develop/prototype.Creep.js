'use strict';

Creep.prototype.error = function (text, data) {
  this.say('!');
  console.log(`creep "${this.name}": ${text}`);
  if (data) {
    console.log(JSON.stringify(data));
  }
};

Creep.prototype.isEmpty = function (resource, rest) {
  if (typeof resource === 'number') {
    rest = resource;
    resource = undefined;
  }
  resource = resource || RESOURCE_ENERGY;
  return this.carry[resource] <= rest;
};

Creep.prototype.isFull = function () {
  return this.carryCapacity > 0
         &&
         _.sum(this.carry) === this.carryCapacity;
};

Creep.prototype.moveAwayFrom = function (object) => {
  var directionTo;
  var path = this.pos.findPathTo(object);
  if(path.length > 0) {
    directionTo = path[0].direction;
  }
  if (!directionTo) {
    this.error('missing path', { objectId: object.id });
    return;
  }

  var directionAwayFrom;
  switch (directionTo) {
    case TOP: directionAwayFrom = BOTTOM;
      break;
    case TOP_RIGHT: directionAwayFrom = BOTTOM_LEFT;
      break;
    case RIGHT: directionAwayFrom = LEFT;
      break;
    case BOTTOM_RIGHT: directionAwayFrom = TOP_LEFT;
      break;
    case BOTTOM: directionAwayFrom = TOP;
      break;
    case BOTTOM_LEFT: directionAwayFrom = TOP_RIGHT;
      break;
    case LEFT: directionAwayFrom = RIGHT;
      break;
    case TOP_LEFT: directionAwayFrom = BOTTOM_RIGHT;
      break;
  }
  if (!directionAwayFrom) {
    this.error('unknown directionTo', { directionTo });
    return;
  }

  this.move(directionAwayFrom);
};