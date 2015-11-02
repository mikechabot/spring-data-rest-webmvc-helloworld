app.factory('AjaxResponseFactory', ['DATA_CONST', function(DATA_CONST) {

    function AjaxResponse() { }

    angular.extend(AjaxResponse.prototype, {
        _init: function (jsonData, jqXHR) {

            if (!angular.hasValue(jsonData) || _.isEmpty(jsonData)) {
                throw new Error('jsonData cannot be null/undefined');
            }

            this.data = {};                     // Holds data object sent back from the server
            this.error = undefined;             // Holds error details (code and status text)
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
            if (!this.isSuccess()) {
                this.error = {
                    code: jqXHR ? jqXHR.status : undefined,
                    status: jqXHR ?
                        jqXHR.statusText
                        : this.getStatusMessage()
                            ? this.getStatusMessage()
                            : 'Failed with not additional detail from the server'
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
        hasStatusMessage: function() {
            return angular.hasValue(this.getStatusMessage())
                && !_.isEmpty(this.getStatusMessage());
        },
        hasError: function() {
            return angular.hasValue(this.getError());
        },
        getError: function() {
            return this.error;
        },
        getErrorCode: function() {
            return this.hasError()
                ? this.getError().code
                : undefined;
        },
        getErrorStatus: function() {
            return this.hasError()
                ? this.getError().status
                : undefined;
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