(function(){
  'use strict';

  angular
  .module('lsv')
  .factory('SensorService', function ($http, $firebase, auth){
    localStorage.lsvRegistered = localStorage.lsvRegistered || null;
    localStorage.lsvSensorID = localStorage.lsvSensorID || null;
    // var sensorID = auth.sensor;
    var sensorID;
    var plant = {};
    // var ref = new Firebase(auth.firebase + '/' + sensorID);
    var ref;
    var registered = false;
    if(localStorage.lsvRegistered !== "null" && localStorage.lsvSensorID !== "null"){
      registered = localStorage.lsvRegistered;
      sensorID = localStorage.lsvSensorID;
      console.log(sensorID);
      ref = new Firebase(auth.firebase + '/' + sensorID);
    }

    return {
      getSensor: function(){
        var promise = $http
          .get(auth.sensor, {timeout: 1500})
          .success(function (res){
            console.log(res);
            sensorID = res;
            localStorage.lsvSensorID = sensorID;
            ref = new Firebase(auth.firebase + '/' + sensorID);
            localStorage.lsvRegistered = true;
            registered = localStorage.lsvRegistered;
            return res.status;
          })
          .error(function (err){
            return null;
          });
        return promise;
      },
      getStats: function(){
        ref.on("value", function(snapshot) {
          console.log(snapshot.val());
          plant = snapshot.val();
        });
        return plant;
      },
      pushPlant: function(plantname, cb){
        ref.set({name: plantname}, cb);
      },
      isRegistered: function(){
        return registered;
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
