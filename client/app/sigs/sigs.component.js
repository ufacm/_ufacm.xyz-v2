'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './sigs.routes';

export class SigsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('ufacmXyzV2App.sigs', [uiRouter])
  .config(routes)
  .component('sigs', {
    template: require('./sigs.html'),
    controller: SigsComponent,
    controllerAs: 'sigsCtrl'
  })
  .name;
