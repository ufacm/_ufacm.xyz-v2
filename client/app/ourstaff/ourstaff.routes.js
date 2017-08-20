'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('ourstaff', {
      url: '/ourstaff',
      template: '<ourstaff></ourstaff>'
    });
}
