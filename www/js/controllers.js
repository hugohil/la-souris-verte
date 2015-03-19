(function(){
  'use strict';

  angular
  .module('lsv')
  .controller('NavCtrl', function ($scope, $rootScope, $mdSidenav, $route, $location, SensorService){
    var self = this;
    // self.plant = SensorService.getStats();

    self.currentView = $location.path();

    self.registered = false;

    self.toggleSideNav = function (name){
      $mdSidenav(name).toggle();
    }

    $scope.$on('$routeChangeStart', function(){
      $mdSidenav('left').close();
    });
    $scope.$on('$routeChangeSuccess', function(){
      self.current = $location.path();
      self.registered = SensorService.isRegistered();
    })
  })
  .controller('WelcomeCtrl', function ($http, SensorService, $mdDialog){
    if(SensorService.isRegistered()){
      // Lame ...
      window.location = '#/plant';
    }
    var self = this;

    self.registerPlant = function(){
      var alert = $mdDialog.alert({
        title: 'Enregistre ta plante',
        template:
         '<md-dialog aria-label="List dialog">' +
         '  <md-content>'+
         '    <md-input-container>'+
         '       <label>Nom de la plante</label>'+
         '       <input ng-model="plantName" required type="text">'+
         '     </md-input-container>'+
         '  </md-content>' +
         '  <div class="md-actions">' +
         '    <md-button ng-click="submitDialog()">' +
         '      Ok' +
         '    </md-button>' +
         '  </div>' +
         '</md-dialog>',
        controller: DialogController
      });
      $mdDialog
        .show(alert)
        .finally(function() {
          alert = null;
        });
      function DialogController(scope, $mdDialog) {
        scope.submitDialog = function() {
          console.log(scope.plantName);
          if(scope.plantName.length){
            SensorService.pushPlant(scope.plantName, function(){
              $mdDialog.hide();
              window.location = '#/plant';
            });
          }
        }
      }
    }

    self.tryGetSensor = function(){
      SensorService.getSensor().success(function (data){
        self.registerPlant();
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