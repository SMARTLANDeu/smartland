(function () {
  'use strict';

  angular
    .module('app.controllers')
    .controller('AboutController', ContactController);

  function ContactController () {
    /*jshint validthis: true*/
    var vm = this;
    vm.title = 'About Controller Content';
  }

})();
