angular.module('event', [])
  .controller('rsvp', ['$scope', '$http', function($scope, $http) {
    $scope.attendees = [];
    $scope.id = null;
    $scope.count = 0;
    $scope.howManyIsHere = 0;
    $scope.everyoneHere = false;

    $scope.init = function(id) {
      $scope.id = id;
      $http.get('/api/attendees/' + id).then(function(response) {
        $scope.attendees = response.data;
        $scope.count = $scope.attendees.length;
        angular.forEach($scope.attendees, function(value, key) {
          if (value.arrived == true) {
            $scope.howManyIsHere++;
          }
        });
      });
    };
    
    $scope.getTotalAttending = function() {
      var total = 0;
      for(var i = 0; i < $scope.attendees.length; i++){
          var tick = $scope.attendees[i].tickets;
          total += (tick.total);
      }
      $scope.count = total;
      return total;
    };
    
    $scope.getTotalArrived= function() {
      var total = 0;
      for(var i = 0; i < $scope.attendees.length; i++){
        console.log($scope.attendees[i].arrived);
        if ($scope.attendees[i].arrived === true) {
          var tick = $scope.attendees[i].tickets;
          total += (tick.total);
        }
      }
      $scope.count = total;
      return total;
    };

    $scope.checkAttendee = function(g) {
      g.gid = $scope.id;
      $http.post('/api/attendees/hasArrived', g).then(function(response) {
        $scope.attendees = response.data;
        $scope.count = $scope.attendees.length;
        angular.forEach($scope.attendees, function(value, key) {
          if (value.arrived == true) {
            $scope.howManyIsHere++;
          }
        });
      });
    };

    $scope.getGuestInfo = function(g) {
      $scope.user = g;
    };

  }]);
