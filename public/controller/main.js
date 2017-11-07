'use strict';
var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  
  // Now set up the states
  $stateProvider
    .state('main', {
      url: "/",
      templateUrl: "/views/dashboard.html",
      controller: "RevisionController"
  });

    $urlRouterProvider.otherwise("/");
});


myApp.controller('RevisionController',['$scope', '$http', function($scope,$http){

  $scope.rv = {};


  // -------------------------------------------------------------------------
  // Create section
  // -------------------------------------------------------------------------

  $scope.rv.co = {
    isSubmited: false,
    model: {}
  };



  /**
   *
   */
  $scope.rv.co.openModal = function() {
      $("#create-learning-point-modal").modal('show');
  }


  /**
   *
   */
  $scope.rv.co.closeModal = function() {
    $scope.rv.co.model = {};
    $("#create-learning-point-modal").modal('hide');
  }


  /**
   *
   */
  $scope.rv.co.submitAction = function(form) {

    //
    if(form.$invalid) {
      $scope.rv.co.isSubmited = true;
      return;
    }


    //
    $http.post('/api/v1/learning-points/create', $scope.rv.co.model).then(function(response) {
        $scope.rv.lo.data.push(response.data.data);
        $scope.rv.co.closeModal();
    });

  }



  // -------------------------------------------------------------------------
  // Edit section
  // -------------------------------------------------------------------------

  $scope.rv.eo = {
    isSubmited: false,
    model: {}
  };


  /**
   *
   */
  $scope.rv.eo.editModal = function() {
      $("#edit-learning-point-modal").modal('show');
  }


  /**
   *
   */
  $scope.rv.eo.closeModal = function() {
    $scope.rv.eo.model = {};
    $("#edit-learning-point-modal").modal('hide');
  }


  /**
   *
   */
  $scope.rv.eo.submitAction = function(form) {

    //
    if(form.$invalid) {
      $scope.rv.eo.isSubmited = true;
      return;
    }


    // //
    // $http.post('/api/v1/learning-points/create', $scope.rv.co.model).then(function(response) {
    //     $scope.rv.lo.data.push(response.data.data);
    //     $scope.rv.co.closeModal();
    // });

  }



  // -------------------------------------------------------------------------
  // List section
  // -------------------------------------------------------------------------

  $scope.rv.lo = {};
  $scope.rv.lo.data = [];


  /**
   *
   */
  $scope.rv.lo.getData = function() {

    //
    $http.post('/api/v1/learning-points/get', {}).then(function(response) {

      $scope.rv.lo.data = response.data;
    });
  }

}]);



//
myApp.run(function($rootScope) {

});


//
angular.element(document).ready(function() {

    
  angular.bootstrap(document, ['myApp']);
  alert("ds");
});
