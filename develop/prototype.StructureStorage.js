'use strict';

StructureStorage.prototype.isFull = function (percentage) {
  percentage = percentage || 1;
  return (_.sum(this.store) / this.storeCapacity) >= percentage;
};
