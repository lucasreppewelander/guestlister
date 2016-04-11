
var p = angular.module('guestlister', ['ngRoute'])
.config(function ($routeProvider) {
  // configure the routing rules here
  $routeProvider.when('/guestlist/:id', {
      controller: 'attendees'
  });
});

p.controller('myGuestlists', ['$scope', '$http', function($scope, $http) {
  $scope.loading = true;
  $scope.mylists = [];

  $http.get('/api/list/get')
    .then(function(response) {
      $scope.mylists = response.data;
      $scope.loading = false;
    });

  $scope.fd = {};
  $scope.processForm = function() {
    $scope.loading = true;
    $http.post('/api/list/create', $scope.fd)
      .success(function(data) {
        $scope.mylists.push({
          name: $scope.fd.name,
          date: $scope.fd.date
        });
      })
      .error(function(data, status, headers, config) {
        console.log('error', data, status);
      })
      .catch(function(data) {
        console.log('catch', data);
      })
      .finally(function() {
        $scope.fd = null;
        $scope.loading = false;
      });
  };
}]);

p.controller('attendees', ['$scope', '$http', function($scope, $http) {
  $scope.attendees = [];
  $scope.att = {};
  $scope.id = null;

  $scope.init = function(id) {
    $scope.id = id;
    $http.get('/api/attendees/' + id).then(function(response) {
      $scope.attendees = response.data;
    });
  };
  
  $scope.getTotalAttending = function() {
    var total = 0;
    for(var i = 0; i < $scope.attendees.length; i++){
        var tick = $scope.attendees[i].tickets;
        total += (tick.total);
    }
    return total;
  };

  $scope.enterGuest = function(listId) {
    $scope.att.listId = listId;
    $scope.att.email = $scope.attendee.email;
    $scope.att.name = $scope.attendee.name;
    $scope.att.tickets = $scope.attendee.tickets;
    $http.post('/api/attendees/add', $scope.att).then(function(response) {
      $scope.attendees.push({
        name: $scope.attendee.name,
        email: $scope.attendee.email,
        ticket: $scope.attendee.tickets
      });
    });
  };
}]);
