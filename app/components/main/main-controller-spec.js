'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('myApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      dataPackage: {
        resources: []
      }
    });
  }));

  it('should attach a dataPackage', function () {
    expect(MainCtrl.isPrintView).toBe(false);
    expect(MainCtrl.dataPackage).toBeDefined();
    expect(MainCtrl.selectedTab).toBe(0);
  });
});
