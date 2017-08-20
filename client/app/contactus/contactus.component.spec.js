'use strict';

describe('Component: ContactusComponent', function() {
  // load the controller's module
  beforeEach(module('ufacmXyzV2App.contactus'));

  var ContactusComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ContactusComponent = $componentController('contactus', {});
  }));

  it('should ...', function() {
    1.should.equal(1);
  });
});
