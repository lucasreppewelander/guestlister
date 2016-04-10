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
        console.log(" inside init : " + $scope.howManyIsHere);
      });
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



  }]);
