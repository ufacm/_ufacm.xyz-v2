'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './contactus.routes';

export class ContactusComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('ufacmXyzV2App.contactus', [uiRouter])
  .config(routes)
  .component('contactus', {
    template: require('./contactus.html'),
    controller: ContactusComponent,
    controllerAs: 'contactusCtrl'
  })
  .name;
