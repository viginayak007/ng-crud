var app = angular.module('App', []);
 
app.controller("Ctrl",[ '$scope', '$http', function ($scope, $http) {
    $scope.loading = {
      empList : false
    }
    $scope.error = {
      add : false,
      add_msg : ''
    }

    $scope.data = {};
    $scope.empData = [];

    var onInit = function(){
      $scope.data = { 
        action      : 'add', 
        ID          : 0, 
        name        : null, 
        address     : null,
        department  : null, 
        city        : null
      };

      $scope.loading.empList = true;
      $http.get("/api/employees").then(function(response) {
        $scope.loading.empList = false;
        $scope.empData = response.data;
      })
    } 

    onInit();

    $scope.submit = function () {
      
      $scope.error.add = false,
      $scope.error.add_msg = ''
      $http.post("/api/doEmp", $scope.data).then(function(response) {
        if(response.status == 200){
          alert('Record added sucessfully');
          onInit();
        }else if(response.status == 500){
          $scope.error.add = true,
          $scope.error.add_msg = 'Internal server error'
        }else{
          $scope.error.add = true,
          $scope.error.add_msg = 'Error while saving the data'
        }
          
      })
    }

    $scope.edit = function(e){
      $scope.data = angular.copy(e);
      $scope.data.action = 'edit';
    }

    $scope.delete = function(e){
      if(confirm('Are you sure delete ' + e.name)){
        e.action = 'delete';
        $http.post("/api/doEmp", e).then(function(response) {
          if(response.status == 200){
            alert('Record delete sucessfully');
          }else{
            alert('Error while deleting record');
          }
          onInit();
        })
      }
    }

    $scope.cancel = function(){
      onInit();
    }
    
}]);