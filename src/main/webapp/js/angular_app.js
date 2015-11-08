var app = angular.module('springHelloWorld', []);

app.filter('capitalize', function() {
    return function(word) {
        return angular.isString(word)
            ? word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
            : '';
    }
});

app.directive('tableOfData', ['$filter', function($filter) {

    var templateHtml =
        '<table>' +
            '<thead>' +
                '<tr>' +
                    '<th>#</th>' +
                    '<th ng-repeat="header in headers">{{header | capitalize}}</td>' +
                '</tr>' +
            '</thead>' +
            '<tbody>' +
                '<tr ng-repeat="row in data">' +
                    '<td>{{$index}}</td>' +
                    '<td ng-repeat="header in headers">{{row[header]}}</td>' +
                '</tr>' +
            '</tbody>' +
        '</table>';


    return {
        restrict: 'E',
        template: templateHtml,
        scope: {
            data: '='
        },
        link: function(scope) {
            scope.headers = _.keys(scope.data[0]);
        }
    }
}]);

app.controller('SampleController', ['$scope', '$timeout', 'ExampleService',
    function ($scope, $timeout, ExampleService) {

        _updateExampleList();

        function _updateExampleList() {
            ExampleService.getExampleData()
                .done(function(examples) {
                    $timeout(function() {
                        $scope.examples = _.isEmpty(examples) ? undefined : examples;
                    });
                });
        }

        $scope.createExampleData = function(name) {
            ExampleService.createExampleData(name)
                .done(function() {
                    _updateExampleList();
                })
                .always(function() {
                    $scope.name = undefined;
                });
        };

        $scope.showAll = function() {
            _updateExampleList();
            $scope.displayShowAll = false;
        };

        $scope.clearCollection = function() {
            ExampleService.clearCollection()
                .done(function() {
                    _updateExampleList();
                });
        };

        $scope.findByName = function(searchName) {
            ExampleService.findByName(searchName)
                .done(function(examples) {
                    $timeout(function() {
                        $scope.examples = examples;
                        $scope.displayShowAll = true;
                    });
                })
                .always(function() {
                    $timeout(function() {
                        $scope.searchName = undefined;
                    });
                });
        }

    }
]);






