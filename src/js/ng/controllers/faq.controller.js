(function () {
  'use strict';

  angular
    .module('app.controllers')
    .controller('FaqController', FaqController);

  function FaqController () {
    /*jshint validthis: true*/
    var vm = this;
    vm.title = 'Contact Controller Content';
  }

})();
