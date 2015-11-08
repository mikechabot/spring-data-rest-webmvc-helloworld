app.factory('AjaxRequestFactory', ['DATA_CONST', 'AjaxResponseFactory', 'AjaxService', function(DATA_CONST, AjaxResponseFactory, AjaxService) {

    function _request(request) {
        var deferred = $.Deferred();

        AjaxService.request(request.options)
            .done(function (response, status, jqXHR) {
                request.response = _response(response, status, jqXHR);
                deferred = request.isSuccess()
                    ? deferred.resolve()
                    : deferred.reject();
            })
            .fail(function (jqXHR, status, error) {
                request.response = _response(jqXHR.responseJSON, status, jqXHR, error);
                deferred.reject();
            })
            .always(function() {
                _log(request);

            });

        return deferred.promise();
    }

    function _response(response, status, jqXHR, error) {
        return AjaxResponseFactory(response, status, jqXHR, error);
    }

    function _log(request) {
        !request.isSuccess()
            ? console.error(request.getOptions().url, request.getStatusCode(), request.getMessage())
            : request.hasMessage()
                ? console.log(request.getMessage())
                : undefined;
    }

    function AjaxRequest() {};

    angular.extend(AjaxRequest.prototype, {
        _init: function(type, url, data) {
            var deferred = $.Deferred();

            var ajaxRequest = this;
            this.options = {};                      // Holds the AJAX request options
            this.response = {};                     // Holds the AJAX response object (body, status, status messages)

            if (!type || !url) {
                deferred.reject(new Error('Type and/or URL cannot be null, undefined, or empty'))
            }

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
                this.options.data = _.isObject(data) ? JSON.stringify(data) : data;
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
        getMessage: function() {
            return this.getResponse().getMessage()
        },
        getStatus: function() {
            return this.getResponse().getStatus()
        },
        getStatusCode: function() {
            return this.getResponse().getStatusCode();
        },
        hasMessage: function() {
            return this.getResponse().hasMessage();
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