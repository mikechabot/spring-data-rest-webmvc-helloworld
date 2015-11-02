app.service('ExampleService', ['DataAccessService', function (DataAccessService) {

    var _baseServiceUrl = '/example';

    return {
        getExampleData: function() {
            return DataAccessService.get(_baseServiceUrl);
        },
        createExampleData: function() {
            return DataAccessService.post(_baseServiceUrl);
        },
        clearCollection: function() {
            return DataAccessService.post(_baseServiceUrl + '/delete/all');
        }
    };
}]);