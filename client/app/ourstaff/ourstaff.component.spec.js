'use strict';

describe('Component: OurstaffComponent', function() {
  // load the controller's module
  beforeEach(module('ufacmXyzV2App.ourstaff'));

  var OurstaffComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    OurstaffComponent = $componentController('ourstaff', {});
  }));

  it('should ...', function() {
    1.should.equal(1);
  });
});
