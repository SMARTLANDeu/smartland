(function () {
  'use strict';

  angular
    .module('app.controllers')
    .controller('ContactController', ContactController);

  function ContactController () {
    /*jshint validthis: true*/
    var vm = this;
    vm.title = 'Contact Controller Content';
  }

})();
