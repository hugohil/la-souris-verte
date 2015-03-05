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
    });
  })
  .controller('WelcomeCtrl', function ($http, SensorService){
    var self = this;

    self.tryGetSensor = function(){
      SensorService.getSensor().then(function (data){
        console.log(data);
      });
    }

    self.add = function() {
      var alarmTime = new Date();
      alarmTime.setSeconds(alarmTime.getSeconds() + 2);
      window.plugin.notification.local.add({
        id: new Date().getTime(),
        date: alarmTime,
        message: "This is a message",
        title: new Date().getTime(),
        autoCancel: false,
        sound: null
      })
    };

    document.addEventListener("deviceready", function () {
      cordova.plugins.notification.local.schedule({
        id: 1,
        text: 'Scheduled every minute',
        every: 'minute',
      });
      cordova.plugins.notification.local.registerPermission(function (granted) {
        alert(granted);
      });
      cordova.plugins.notification.local.hasPermission(function (granted) {
        alert(granted);
      });
    }, false);
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
