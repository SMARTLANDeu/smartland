(function () {
  'use strict';

  angular.module('app').config(
    function ($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: '/app/map/map.html',
          controller: 'MapController',
          controllerAs: 'vm'
        })
        .state('about', {
          url: '/about',
          templateUrl: '/app/about/about.html',
          controller: 'AboutController',
          controllerAs: 'vm'
        })
        .state('contact', {
          url: '/contact',
          templateUrl: '/app/contact/contact.html',
          controller: 'ContactController',
          controllerAs: 'vm'
        }).state('usecases', {
          url: '/usecases',
          templateUrl: '/app/usecases/usecases.html',
          controller: 'UsecasesController',
          controllerAs: 'vm'
        }).state('faq', {
          url: '/faq',
          templateUrl: '/app/faq/faq.html',
          controller: 'FaqController',
          controllerAs: 'vm'
        })
      ;
      // default path to navigate (also used as a fallback for missing urls)
      $urlRouterProvider.otherwise('/');
    }
  );

})();
