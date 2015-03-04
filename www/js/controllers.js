(function(){
  'use strict';

  angular
  .module('lsv')
  .controller('NavCtrl', function ($scope, $rootScope, $mdSidenav, $route, $location, SensorService){
    var self = this;
    self.plant = SensorService.getStats();

    self.currentView = $location.path();

    self.registered = true;

    self.toggleSideNav = function (name){
      $mdSidenav(name).toggle();
    }

    $scope.$on('$routeChangeStart', function(){
      $mdSidenav('left').close();
    });
    $scope.$on('$routeChangeSuccess', function(){
      self.current = $location.path();
    })
  })
  .controller('WelcomeCtrl', function ($http, SensorService){
    var self = this;

    self.tryGetSensor = function(){
      SensorService.getSensor().then(function (data){
        console.log(data);
      });
    }
  })
  .controller('PlantCtrl', function (SensorService, FactsService){
    var self = this;
    this.plant = SensorService.getStats();

    this.showFact = function(){
      FactsService.getRandomFact();
    }
  })
  .controller('SettingsCtrl', function ($mdSidenav){
  })



})();