app.service('ExampleService', ['DataAccessService', function (DataAccessService) {

    var _baseServiceUrl = '/example';

    return {
        createExampleData: function() {
            return DataAccessService.post(_baseServiceUrl);
        },
        getExampleList: function() {
            return DataAccessService.get(_baseServiceUrl);
        },
        clearCollection: function() {
            return DataAccessService.post(_baseServiceUrl + '/delete/all');
        }
    };

}]);