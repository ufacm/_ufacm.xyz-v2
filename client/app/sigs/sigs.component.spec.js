'use strict';

describe('Component: SigsComponent', function() {
  // load the controller's module
  beforeEach(module('ufacmXyzV2App.sigs'));

  var SigsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SigsComponent = $componentController('sigs', {});
  }));

  it('should ...', function() {
    1.should.equal(1);
  });
});
