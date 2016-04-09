
var p = angular.module('guestlister', []);

p.controller('myGuestlists', ['$scope', '$http', function($scope, $http) {
  $scope.loading = true;
  $scope.mylists = [];

  $http.get('/guestlist/mylists')
    .then(function(response) {
      $scope.mylists = response.data;
      $scope.loading = false;
    });

  $scope.fd = {};
  $scope.processForm = function() {
    $scope.loading = true;
    $http.post('/guestlist/create', $scope.fd)
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
