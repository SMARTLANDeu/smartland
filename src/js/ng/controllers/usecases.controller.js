(function () {
  'use strict';

  angular
    .module('app.controllers')
    .controller('UsecasesController', UsecasesController);

  function UsecasesController () {
    /*jshint validthis: true*/
    var vm = this;
    vm.title = 'Contact Controller Content';
  }

})();
