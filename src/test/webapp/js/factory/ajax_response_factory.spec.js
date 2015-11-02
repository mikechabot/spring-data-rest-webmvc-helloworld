describe('ajax_response_factory.js', function() {

    var factory = undefined,
        dataConst =  {
            REQUEST_STATUS: {
                SUCCESS: 'SUCCESS',
                FAIL: 'FAIL',
                ERROR: 'ERROR'
            }
        };

    beforeEach(function() {
        module('test', function($provide) {
            $provide.constant('DATA_CONST', dataConst);
        });
    });

    beforeEach(inject(function(AjaxResponseFactory) {
        factory = AjaxResponseFactory;
    }));

    describe('AjaxResponseFactory(successfulJsonResponse)', function() {

        describe('test constructor with success response', function() {

            var inputJson = testData.jsonResponseData.getSuccessResponse();
            var ajaxResponse;

            beforeEach(function() {
                ajaxResponse = factory(inputJson);
            });

            it('getData() should return inputJson data', function () {
                expect(ajaxResponse.getData()).toEqual(inputJson.data);
            });
            it('getStatus() should return inputJson status', function () {
                expect(ajaxResponse.getStatus()).toEqual(inputJson.status);
            });
            it('getStatusMessage() should return inputJson status message', function () {
                expect(ajaxResponse.getStatusMessage()).toEqual(inputJson.statusMessage);
            });
            it('hasStatusMessage() should return false', function () {
                expect(ajaxResponse.hasStatusMessage()).toEqual(true);
            });
            it('hasError() should return false', function () {
                expect(ajaxResponse.hasError()).toEqual(false);
            });
            it('getError() should return undefined', function () {
                expect(ajaxResponse.getError()).toEqual(undefined);
            });
            it('getErrorCode() should return undefined', function () {
                expect(ajaxResponse.getErrorCode()).toEqual(undefined);
            });
            it('getErrorStatus() should return undefined', function () {
                expect(ajaxResponse.getErrorStatus()).toEqual(undefined);
            });
            it('isSuccess() should return true', function () {
                expect(ajaxResponse.isSuccess()).toEqual(true);
            });
            it('isFail() should return false', function () {
                expect(ajaxResponse.isFail()).toEqual(false);
            });
            it('isError() should return false', function () {
                expect(ajaxResponse.isError()).toEqual(false);
            });
        });

    });

    describe('AjaxResponseFactory(failedJsonResponse)', function() {

        describe('test constructor with failed response', function() {

            var inputJson = testData.jsonResponseData.getFailResponse();
            var ajaxResponse;

            beforeEach(function() {
                ajaxResponse = factory(inputJson);
            });

            it('getData() should return inputJson data', function () {
                expect(ajaxResponse.getData()).toEqual(inputJson.data);
            });
            it('getStatus() should return inputJson status', function () {
                expect(ajaxResponse.getStatus()).toEqual(inputJson.status);
            });
            it('getStatusMessage() should return inputJson status message', function () {
                expect(ajaxResponse.getStatusMessage()).toEqual(inputJson.statusMessage);
            });
            it('hasStatusMessage() should return true', function () {
                expect(ajaxResponse.hasStatusMessage()).toEqual(true);
            });
            it('hasError() should return true', function () {
                expect(ajaxResponse.hasError()).toEqual(true);
            });
            it('getError() should return an error object', function () {
                expect(ajaxResponse.getError()).toEqual({code: undefined, status: inputJson.statusMessage});
            });
            it('getErrorCode() should return undefined', function () {
                expect(ajaxResponse.getErrorCode()).toEqual(undefined);
            });
            it('getErrorStatus() should return inputJson status message', function () {
                expect(ajaxResponse.getErrorStatus()).toEqual(inputJson.statusMessage);
            });
            it('isSuccess() should return true', function () {
                expect(ajaxResponse.isSuccess()).toEqual(false);
            });
            it('isFail() should return false', function () {
                expect(ajaxResponse.isFail()).toEqual(true);
            });
            it('isError() should return false', function () {
                expect(ajaxResponse.isError()).toEqual(false);
            });
        });

    });

    describe('AjaxResponseFactory(errorJsonResponse, jqXHR)', function() {

        describe('test constructor with error response', function() {

            var inputJson = testData.jsonResponseData.getErrorResponse();
            var inputJqXHR = testData.jqXHR.getInternalServerError();

            var ajaxResponse;

            beforeEach(function() {
                ajaxResponse = factory(inputJson, inputJqXHR);
            });

            it('getData() should return inputJson data', function () {
                expect(ajaxResponse.getData()).toEqual(inputJson.data);
            });
            it('getStatus() should return inputJson status', function () {
                expect(ajaxResponse.getStatus()).toEqual(inputJson.status);
            });
            it('getStatusMessage() should return inputJson status message', function () {
                expect(ajaxResponse.getStatusMessage()).toEqual(inputJson.statusMessage);
            });
            it('hasStatusMessage() should return true', function () {
                expect(ajaxResponse.hasStatusMessage()).toEqual(true);
            });
            it('hasError() should return true', function () {
                expect(ajaxResponse.hasError()).toEqual(true);
            });
            it('getError() should return an error object', function () {
                expect(ajaxResponse.getError()).toEqual({code: inputJqXHR.status, status: inputJqXHR.statusText});
            });
            it('getErrorCode() should return the error code', function () {
                expect(ajaxResponse.getErrorCode()).toEqual(inputJqXHR.status);
            });
            it('getErrorStatus() should return inputJson status message', function () {
                expect(ajaxResponse.getErrorStatus()).toEqual(inputJqXHR.statusText);
            });
            it('isSuccess() should return true', function () {
                expect(ajaxResponse.isSuccess()).toEqual(false);
            });
            it('isFail() should return false', function () {
                expect(ajaxResponse.isFail()).toEqual(false);
            });
            it('isError() should return false', function () {
                expect(ajaxResponse.isError()).toEqual(true);
            });
        });

    });

    describe('AjaxResponseFactory(invalidValues)', function() {

        describe('test constructor with undefined', function() {
            it('it should throw an error', function () {
                expect(function() {
                    factory(undefined)
                }).toThrow(new Error('jsonData cannot be null/undefined'));
            });
        });

        describe('test constructor with null', function() {
            it('it should throw an error', function () {
                expect(function() {
                    factory(null)
                }).toThrow(new Error('jsonData cannot be null/undefined'));
            });
        });

        describe('test constructor with empty object', function() {
            it('it should throw an error', function () {
                expect(function() {
                    factory({})
                }).toThrow(new Error('jsonData cannot be null/undefined'));
            });
        });

    });

});