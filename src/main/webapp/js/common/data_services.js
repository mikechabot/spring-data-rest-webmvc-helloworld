/**
 * Service to perform jQuery AJAX calls
 */
app.service('AjaxService', function () {
    return {
        request: function (options) {
            return $.ajax(options);
        },
        getStatusFromJqXHR: function(jqXHR) {
            if (!jqXHR) return;
            var status = jqXHR.status;
            if (status === DATA_CONST.JQXHR_STATUS.SUCCESS) {
                return DATA_CONST.REQUEST_STATUS.SUCCESS;
            } else if (status === DATA_CONST.JQXHR_STATUS.SUCCESS) {
                return DATA_CONST.REQUEST_STATUS.ERROR;
            }
            return 'Unable to map jqXHR status to request status: ' + status;
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
        if (!angular.hasValue(url) || _.isEmpty(url)) {
            deferred.reject(new Error('URL cannot be null, undefined, or empty'));
        } else {
            AjaxRequestFactory(type, url, data)
                .done(function (response) {
                    deferred.resolve(response.getData());
                })
                .fail(function (response) {
                    deferred.reject(response.getData());
                });
        }

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