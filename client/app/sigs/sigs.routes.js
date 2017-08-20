'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('sigs', {
      url: '/sigs',
      template: '<sigs></sigs>'
    });
}
