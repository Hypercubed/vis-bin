'use strict';

describe('Factory: dataservice', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var dataservice;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_DataServiceFactory_) {
    dataservice = _DataServiceFactory_;
  }));

  it('should return a service', function () {
    expect(typeof dataservice).toBe('function');
  });
});
