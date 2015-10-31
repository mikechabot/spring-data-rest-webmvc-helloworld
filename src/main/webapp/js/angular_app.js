var app = angular.module('springHelloWorld', []);

app.controller('MainController', ['$scope', '$timeout', 'ExampleService',
    function ($scope, $timeout, ExampleService) {

        ExampleService.getExampleData()
            .done(function(response) {
                $timeout(function() {
                    $scope.exampleData = response;
                });
            });

    }
]);

