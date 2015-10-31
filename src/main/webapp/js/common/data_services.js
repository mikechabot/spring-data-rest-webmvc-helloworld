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
app.service('DataAccessService', ['AjaxRequestFactory',
    function (AjaxRequestFactory) {

        /**
         * Execute an AJAX request
         * @param type
         * @param url
         * @param data
         * @returns {*}
         * @private
         */
        var _request = function (type, url, data) {
            var deferred = $.Deferred();
            AjaxRequestFactory(type, url, data)
                .done(function (response) {
                    _logMessage(response);
                    deferred.resolve(response.getData());
                })
                .fail(function (response) {
                    _logMessage(response);
                    deferred.reject(response.getData());
                });
            return deferred.promise();
        };

        function _logMessage(response) {
            if (response.hasStatusMessage()) {
                if (response.isSuccess()) {
                    console.log(response.getStatusMessage());
                } else {
                    console.error(response.getStatusMessage());
                }
            }
        }

        return {
            get: function (url) {
                return _request('GET', url, null);
            },
            post: function (url, data) {
                return _request('POST', url, data);
            }
        }

    }]);