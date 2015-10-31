app.service('ExampleService', ['DataAccessService', function (DataAccessService) {

    var _baseServiceUrl = '/example';

    return {
        getExampleData: function() {
            return DataAccessService.get(_baseServiceUrl);
        }
    };

}]);