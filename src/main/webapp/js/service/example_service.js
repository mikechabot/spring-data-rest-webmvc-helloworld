app.service('ExampleService', ['DataAccessService', function (DataAccessService) {

    var _baseServiceUrl = '/example';

    return {
        getExampleData: function() {
            return DataAccessService.get(_baseServiceUrl);
        },
        createExampleData: function(name) {
            var deferred = $.Deferred();
            if (!name) {
                deferred.reject('Name cannot be null');
            } else {
                DataAccessService.post(_baseServiceUrl + '/create', name)
                    .done(function() {
                        deferred.resolve();
                    })
                    .fail(function() {
                        deferred.reject();
                    })
            }
            return deferred.promise();
        },
        clearCollection: function() {
            return DataAccessService.post(_baseServiceUrl + '/delete/all');
        },
        findByName: function(name) {
            return DataAccessService.get(_baseServiceUrl + '/find/' + name);
        }
    };
}]);