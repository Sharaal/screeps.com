'use strict';

RoomObject.prototype.isEmpty = function (opts) {
  opts = opts || {};
  opts.resource = opts.resource || RESOURCE_ENERGY;
  opts.restAmount = opts.restAmount || 0;

  if (this.carryCapacity > 0) {
    return this.carry[opts.resource] <= opts.restAmount;
  }

  if (this.energyCapacity > 0) {
    return this.energy <= opts.restAmount;
  }

  if (this.storeCapacity > 0) {
    return this.store[opts.resource] <= opts.restAmount;
  }
};

RoomObject.prototype.isFull = function (percentage) {
  percentage = percentage || 1;

  if (this.carryCapacity) {
    return (_.sum(this.carry) / this.carryCapacity) >= percentage;
  }

  if (this.energyCapacity) {
    return (this.energy / this.energyCapacity) >= percentage;
  }
  
  if (this.storeCapacity) {
    return (_.sum(this.store) / this.storeCapacity) >= percentage;
  }
};
