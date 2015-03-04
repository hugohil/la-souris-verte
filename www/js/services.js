(function(){
  'use strict';

  angular
  .module('lsv')
  .factory('SensorService', function ($http, $firebase, auth){
    var sensorId;
    var plant = {};
    var ref = new Firebase(auth.firebase);
    var devPlant = {
      name: 'Olivia',
      type: 'Tomate',
      classname: 'svg-11',
      stats: {
        uv: Math.ceil(Math.random() * 1024),
        humidity: Math.ceil(Math.random() * 1024),
        temperature: Math.ceil(Math.random() * 1024)
      }
    };

    return{
      getSensor: function(){
        var promise = $http.get(auth.sensor, {timeout: 150}).then(function (res){
          console.log(res);
          return response.status;
        });
        return promise;
      },
      getStats: function(){
        plant = (plant.length) ? plant : devPlant;
        return plant;
      }
    }
  })
  .factory('FactsService', function ($firebase, auth, $mdDialog){
    var ref = new Firebase(auth.firebase + '/facts');


    return {
      getRandomFact: function(){
        ref.on("value", function(snapshot) {
          var facts = snapshot.val();
          var fact = facts[Math.floor(Math.random() * facts.length)];
          var alert = $mdDialog.alert({
            title: 'Savais tu que ?',
            content: fact,
            ok: 'Maintenant oui !'
          });
          $mdDialog
            .show(alert)
            .finally(function() {
              alert = null;
            });
          return fact;
        }, function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        });
      }
    }
  })
  .factory('AlertService', function(){})

})();