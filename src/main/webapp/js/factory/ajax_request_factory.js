app.factory('AjaxRequestFactory', ['DATA_CONST', 'AjaxResponseFactory', 'AjaxService', function(DATA_CONST, AjaxResponseFactory, AjaxService) {

    function _request(request) {
        var deferred = $.Deferred();

        AjaxService.request(request.options)
            .done(function (response) {
                request.response = AjaxResponseFactory(response);
                deferred = request.isSuccess()
                    ? deferred.resolve()
                    : deferred.reject();
            })
            .fail(function (jqXHR) {
                request.response = AjaxResponseFactory(jqXHR.responseJSON, jqXHR);
                deferred.reject();
            })
            .always(function() {
                // Always log messages from the server
                if (!request.isSuccess()) {
                    console.error(request.getOptions().url, request.getErrorMessage());
                } else if (request.hasStatusMessage()) {
                    console.log(request.getStatusMessage());
                }
            });

        return deferred.promise();
    }

    function AjaxRequest() {};

    angular.extend(AjaxRequest.prototype, {
        _init: function(type, url, data) {
            var deferred = $.Deferred();

            var ajaxRequest = this;
            this.options = {};                      // Holds the AJAX request options
            this.response = {};                     // Holds the AJAX response object (body, status, status messages)

            this._initOptions(type, url, data);

            _request(this)
                .done(function() {
                    deferred.resolve(ajaxRequest);
                })
                .fail(function() {
                    deferred.reject(ajaxRequest);
                });

            return deferred.promise();
        },
        _initOptions: function(type, url, data) {
            this.options = {
                type: type,
                dataType: 'json',
                url: DATA_CONST.BASE_SPRING_URL + url
            };
            if (data) {
                this.options.data = JSON.stringify(data);
                this.options.contentType = 'application/json';
            }
        },
        getOptions: function() {
            return this.options;
        },
        getResponse: function() {
            return this.response;
        },
        getData: function() {
            return this.getResponse().getData();
        },
        getStatus: function() {
            return this.getResponse().getStatus()
        },
        hasStatusMessage: function() {
            return this.getResponse().hasStatusMessage();
        },
        getStatusMessage: function() {
            return this.getResponse().getStatusMessage()
        },
        hasError: function() {
            return this.getResponse().hasError();
        },
        getErrorMessage: function() {
            return this.getResponse().getErrorMessage();
        },
        getErrorStatus: function() {
            return this.getResponse().getErrorStatus();
        },
        getErrorCode: function() {
            return this.getResponse().getErrorCode();
        },
        isSuccess: function() {
            return this.getResponse().isSuccess();
        },
        isFail: function() {
            return this.getResponse().isFail();
        },
        isError: function() {
            return this.getResponse().isError();
        }
    });

    function newAjaxRequest(type, url, data) {
        var deferred = $.Deferred();

        new AjaxRequest()._init(type, url, data)
            .done(function(ajaxResponse) {
                deferred.resolve(ajaxResponse);
            })
            .fail(function(ajaxResponse) {
                deferred.reject(ajaxResponse);
            });

        return deferred.promise();
    }

    return newAjaxRequest;

}]);