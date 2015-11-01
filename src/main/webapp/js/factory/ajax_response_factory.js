app.factory('AjaxResponseFactory', ['DATA_CONST', function(DATA_CONST) {

    function AjaxResponse() { }

    angular.extend(AjaxResponse.prototype, {
        _init: function (jsonData, jqXHR) {

            this.data = {};                     // Holds data object sent back from the server
            this.error = {};                    // Holds error details (code and status text)
            this.status = undefined;            // Status of the request/response (success, fail, error)
            this.statusMessage = undefined;     // Additional details related to the status of the request/response

            this._initData(jsonData);
            this._initError(jqXHR);

            return this;
        },
        _initData: function(json) {
            this.data = json.data;
            this.status = json.status;
            this.statusMessage = json.statusMessage;
        },
        _initError: function(jqXHR) {
            if (angular.hasValue(jqXHR) && !this.isSuccess()) {
                this.error = {
                    code: jqXHR.status,
                    status: jqXHR.statusText
                }
            }
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
        getErrorMessage: function () {
           return this.hasStatusMessage()
                ? this.getStatusMessage()
                : 'Failed with not additional detail from the server';
        },
        hasError: function() {
            return angular.hasValue(this.getError());
        },
        hasStatusMessage: function() {
            return angular.hasValue(this.getStatusMessage());
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