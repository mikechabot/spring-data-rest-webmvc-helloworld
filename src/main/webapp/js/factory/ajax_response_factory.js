app.factory('AjaxResponseFactory', ['DATA_CONST', function(DATA_CONST) {

    function AjaxResponse() { }

    angular.extend(AjaxResponse.prototype, {
        _init: function (jsonData, jqXHR) {
            var response = this;

            this.data = jsonData.data;
            this.status = jsonData.status;
            this.statusMessage = jsonData.statusMessage;

            if (angular.isDefined(jqXHR) && !this.isSuccess()) {
                this.error = {
                    code: jqXHR.status,
                    status: jqXHR.statusText
                }
            }

            return response;
        },
        getData: function() {
            return this.data;
        },
        getStatus: function() {
            return this.status;
        },
        getStatusMessage: function() {
            return this.statusMessage;
        },
        getError: function() {
            return this.error;
        },
        getErrorStatus: function() {
            return this.getError().status;
        },
        getErrorCode: function() {
            return this.getError().code;
        },
        hasError: function() {
            return angular.isDefined(this.getError());
        },
        hasStatusMessage: function() {
            return angular.isDefined(this.getStatusMessage());
        },
        isSuccess: function() {
            return this.getStatus() === DATA_CONST.REQUEST_STATUS.SUCCESS;
        },
        isFail: function() {
            return this.getStatus() === DATA_CONST.REQUEST_STATUS.FAIL;
        },
        isError: function() {
            return this.getStatus() === DATA_CONST.REQUEST_STATUS.ERROR;
        }
    });

    return function newAjaxResponse(jsonData, jqXHR) {
        return new AjaxResponse()._init(jsonData, jqXHR);
    };

}]);