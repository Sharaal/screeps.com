'use strict';

module.exports = (creep, object) => {
  var directionTo;
  var path = creep.pos.findPathTo(object);
  if(path.length > 0) {
    directionTo = path[0].direction;
  }
  if (!directionTo) {
    creep.say('!');
    console.log(`creep "${creep.name}" don't find a path to object "${object.id}"`);
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
    creep.say('!');
    console.log(`creep "${creep.name}" has unknown directionTo "${directionTo}"`);
    return;
  }

  creep.move(directionAwayFrom);
};
