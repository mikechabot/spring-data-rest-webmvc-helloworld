var app = angular.module('springHelloWorld', []);

app.controller('MainController', ['$scope', '$timeout', 'ExampleService',
    function ($scope, $timeout, ExampleService) {

        function _init() {
            var promises = [
                ExampleService.getSimpleDataExample(),
                ExampleService.getListOfDataExample()
            ];

            $.when.apply(this, promises)
                .done(function(simpleData, listData) {
                    $timeout(function() {
                        $scope.simpleData = simpleData;
                        $scope.listData = listData;
                    })
                });
        }


        $scope.createExampleData = function() {
            ExampleService.createExampleData()
                .done(function() {
                    ExampleService.getListOfDataExample()
                        .done(function(listData) {
                            $timeout(function() {
                                $scope.listData = listData;
                            });
                        });
                });
        };

        $scope.clearCollection = function() {
            ExampleService.clearCollection()
                .done(function() {
                    ExampleService.getListOfDataExample()
                        .done(function(listData) {
                            $timeout(function() {
                                $scope.listData = listData;
                            });
                        });
                });
        };

        _init();

    }
]);

