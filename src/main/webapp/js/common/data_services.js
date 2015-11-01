/**
 * Service to perform jQuery AJAX calls
 */
app.service('AjaxService', function () {
    return {
        request: function (options) {
            return $.ajax(options);
        }
    }
});

/**
 * Service to perform generic GET/POST actions (Uses JQuery promises)
 */
app.service('DataAccessService', ['AjaxRequestFactory', function (AjaxRequestFactory) {

    /**
     * Generate and execute an AJAX request
     * @param type
     * @param url
     * @param data
     * @returns {*} data
     * @private
     */
    var _request = function (type, url, data) {
        var deferred = $.Deferred();
        AjaxRequestFactory(type, url, data)
            .done(function (response) {
                deferred.resolve(response.getData());
            })
            .fail(function (response) {
                deferred.reject(response.getData());
            });
        return deferred.promise();
    };

    return {
        get: function (url) {
            return _request('GET', url, null);
        },
        post: function (url, data) {
            return _request('POST', url, data);
        }
    }

}]);