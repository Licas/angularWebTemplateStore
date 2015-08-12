'use strict';

angular.module('templateStore.templates',['ngRoute'])

.config(['$routeProvider', function($routeProvider){

    $routeProvider
    .when('/templates/:id', {
        templateUrl: 'templates/template-details.html',
        controller: 'TemplateDetailsCtrl'
     })
     .when('/templates', {
        templateUrl: 'templates/templates.html',
        controller: 'TemplatesCtrl'
     });
}])

.controller('TemplatesCtrl',['$scope', '$http', function($scope, $http){
    //console.log($scope);
   // console.log("Nel controller TemplatesCtrl");

    $http.get('data/templates.json').
        then(function(response) {
            console.log(response.data);
            $scope.templateList = response.data;
        });
}])
.controller('TemplateDetailsCtrl',['$scope', '$http', '$routeParams', '$filter',
                                   function($scope, $http, $routeParams, $filter){
    //console.log($scope);
   // console.log("Nel controller TemplatesCtrl");
    var templateId = $routeParams.id;

    $http.get('data/templates.json').
        then(function(response) {

/*            for (var idx in response.data){
                if (response.data[idx].id == templateId) {
                    $scope.templateDetails = response.data[idx];
                }
            }*/
            $scope.templateDetails = $filter('filter')(response.data, function(d){
                //console.log("d:" + JSON.stringify(d) + " check if equal to " + templateId);
                return d.id == templateId;
            })[0];

            if($scope.templateDetails) {
                $scope.mainImage = $scope.templateDetails.img[0].name;
            }
        });
}]);
