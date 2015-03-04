(function(){
'use strict';

  angular
      .module('lsv', ['ngMaterial', 'ngRoute', 'firebase'])
      .config(function ($mdThemingProvider, $routeProvider) {
        $routeProvider
          .when('/', {
            templateUrl: 'templates/welcome.html',
            controller: 'WelcomeCtrl',
            controllerAs: 'vm'
          })
          .when('/plant', {
            templateUrl: 'templates/plant.html',
            controller: 'PlantCtrl',
            controllerAs: 'vm'
          })
          .when('/settings', {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl',
            controllerAs: 'vm'
          })

        $mdThemingProvider.theme('default')
          .primaryPalette('green')
          .accentPalette('teal');
      });
})();
