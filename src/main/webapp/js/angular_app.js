var app = angular.module('springHelloWorld', []);

app.controller('MainController', ['$scope', '$timeout', 'ExampleService',
    function ($scope, $timeout, ExampleService) {

        _updateExampleList();

        function _updateExampleList() {
            ExampleService.getExampleData()
                .done(function(examples) {
                    $timeout(function() {
                        $scope.examples = examples;
                    });
                });
        }

        $scope.createExampleData = function() {
            ExampleService.createExampleData()
                .done(function() {
                    _updateExampleList();
                });
        };

        $scope.clearCollection = function() {
            ExampleService.clearCollection()
                .done(function() {
                    _updateExampleList();
                });
        };

    }
]);

