'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './ourstaff.routes';

export class OurstaffComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('ufacmXyzV2App.ourstaff', [uiRouter])
  .config(routes)
  .component('ourstaff', {
    template: require('./ourstaff.html'),
    controller: OurstaffComponent,
    controllerAs: 'ourstaffCtrl'
  })
  .name;
