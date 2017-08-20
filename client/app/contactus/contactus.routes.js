'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('contactus', {
      url: '/contactus',
      template: '<contactus></contactus>'
    });
}
