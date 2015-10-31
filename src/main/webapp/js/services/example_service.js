app.service('ExampleService', ['DataAccessService', function (DataAccessService) {

    var _baseServiceUrl = '/example';

    return {
        createExampleData: function() {
            return DataAccessService.post(_baseServiceUrl);
        },
        getSimpleDataExample: function() {
            return DataAccessService.get(_baseServiceUrl + '/simple');
        },
        getListOfDataExample: function() {
            return DataAccessService.get(_baseServiceUrl + '/data');
        },
        clearCollection: function() {
            return DataAccessService.post(_baseServiceUrl + '/clear');
        }
    };

}]);