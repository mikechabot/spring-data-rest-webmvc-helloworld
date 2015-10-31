app.factory('AjaxRequestFactory', ['DATA_CONST', 'AjaxResponseFactory', 'AjaxService', function(DATA_CONST, AjaxResponseFactory, AjaxService) {

    function _request(request) {
        var deferred = $.Deferred();

        AjaxService.request(request.options)
            .done(function (response) {
                request.response = AjaxResponseFactory(response);
                deferred = request.response.isSuccess()
                    ? deferred.resolve()
                    : deferred.reject();
            })
            .fail(function (jqXHR, status, error) {
                request.response = AjaxResponseFactory(jqXHR.responseJSON, jqXHR);
                deferred.reject();
            });

        return deferred.promise();
    }

    function _getOptions(type, url, data) {
        var options = {
            type: type,
            url: DATA_CONST.BASE_SPRING_URL + url,
            dataType: 'json'    // Data type expected back from server
        };
        if (data) {
            this.options.data = JSON.stringify(data);
            this.options.contentType = 'application/json';  // Data type being sent to server
        }
        return options;
    }

    function AjaxRequest() {};

    angular.extend(AjaxRequest.prototype, {
        _init: function(type, url, data) {
            var deferred = $.Deferred();
            var ajaxRequest = this;

            this.options = _getOptions(type, url, data);

            _request(this)
                .done(function() {
                    deferred.resolve(ajaxRequest.getResponse());
                })
                .fail(function() {
                    deferred.reject(ajaxRequest.getResponse());
                });

            return deferred.promise();
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
        getStatusMessage: function() {
            return this.getResponse().getStatusMessage()
        },
        hasStatusMessage: function() {
            return this.getResponse().hasStatusMessage();
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

    return function newAjaxRequest(type, url, data) {
        var deferred = $.Deferred();

        new AjaxRequest()._init(type, url, data)
            .done(function(ajaxResponse) {
                deferred.resolve(ajaxResponse);
            })
            .fail(function(ajaxResponse) {
                deferred.reject(ajaxResponse);
            });

        return deferred.promise();
    };

}]);