describe('ajax_response_factory.js', function() {

    var factory = undefined,
        ajaxService = {},
        dataConst =  {
            REQUEST_STATUS: {
                SUCCESS: 'SUCCESS',
                FAIL: 'FAIL',
                ERROR: 'ERROR'
            },
            JQXHR_STATUS: {
                SUCCESS: 'success',
                ERROR: 'error'
            }
        };

    beforeEach(function() {
        module('test', function($provide) {
            $provide.constant('DATA_CONST', dataConst);
            $provide.constant('AjaxService', ajaxService);
        });
    });

    beforeEach(inject(function(AjaxResponseFactory) {
        factory = AjaxResponseFactory;
    }));

    describe('test constructor with an undefined JSON body', function() {

        var ajaxResponse;

        describe('and with a successful AJAX response', function() {

            var jqXHR = testData.jqXHR.getOk();
            var status = dataConst.JQXHR_STATUS.SUCCESS;

            ajaxService = {
                getStatusFromJqXHR: function() {
                    return dataConst.REQUEST_STATUS.SUCCESS;
                }
            };

            beforeEach(function() {
                ajaxResponse = factory(undefined, status, jqXHR);
            });

            it('and it should create the object with the text of the AJAX response', function () {
                expect(ajaxResponse.getMessage()).toEqual(jqXHR.statusText);
            });
            it('and it should create the object without data', function () {
                expect(ajaxResponse.getData()).toBeUndefined();
            });
            it('and it should create the object with correct status code', function () {
                expect(ajaxResponse.getStatus()).toEqual(dataConst.REQUEST_STATUS.SUCCESS);
            });
            it('and it should create the object with the correct HTTP response code', function () {
                expect(ajaxResponse.getStatusCode()).toEqual(jqXHR.status);
            });

        });

        describe('and with a failed AJAX response', function() {

            var jqXHR = testData.jqXHR.getInternalServerError();
            var status = dataConst.JQXHR_STATUS.ERROR;

            beforeEach(function() {
                ajaxResponse = factory(undefined, status, jqXHR, jqXHR.statusText);
            });

            it('and it should create the object with the text of the AJAX response', function () {
                expect(ajaxResponse.getMessage()).toEqual(jqXHR.statusText);
            });
            it('should create the object, but data is undefined', function () {
                expect(ajaxResponse.getData()).toBeUndefined();
            });
            it('should create the object with a error response status', function () {
                expect(ajaxResponse.getStatus()).toEqual(dataConst.REQUEST_STATUS.ERROR);
            });
            it('should create the object with the correct HTTP response code', function () {
                expect(ajaxResponse.getStatusCode()).toEqual(jqXHR.status);
            });

        });

        describe('and undefined for remaining parameters', function() {
            it('and it should create an empty response object', function () {
                ajaxResponse = factory(undefined);
                expect(ajaxResponse.getData()).toBeUndefined()
                expect(ajaxResponse.getMessage()).toBeUndefined();
                expect(ajaxResponse.getStatus()).toBeUndefined();
                expect(ajaxResponse.getStatusCode()).toBeUndefined();
            });
        });

        describe('and null for remaining parameters', function() {
            it('and it should create an empty response object', function () {
                ajaxResponse = factory(undefined, null, null, null);
                expect(ajaxResponse.getData()).toBeUndefined();
                expect(ajaxResponse.getMessage()).toBeUndefined();
                expect(ajaxResponse.getStatus()).toBeUndefined();
                expect(ajaxResponse.getStatusCode()).toBeUndefined();
            });
        });
    });

    describe('test constructor with a null JSON body', function() {

        var ajaxResponse;

        describe('but with a successful AJAX response', function() {

            var jqXHR = testData.jqXHR.getOk();
            var status = dataConst.JQXHR_STATUS.SUCCESS;

            ajaxService = {
                getStatusFromJqXHR: function() {
                    return dataConst.REQUEST_STATUS.SUCCESS;
                }
            };

            beforeEach(function() {
                ajaxResponse = factory(null, status, jqXHR);
            });

            it('and it should create the object with the text of the AJAX response', function () {
                expect(ajaxResponse.getMessage()).toEqual(jqXHR.statusText);
            });
            it('and it should create the object without data', function () {
                expect(ajaxResponse.getData()).toBeUndefined();
            });
            it('and it should create the object with correct status code', function () {
                expect(ajaxResponse.getStatus()).toEqual(dataConst.REQUEST_STATUS.SUCCESS);
            });
            it('and it should create the object with the correct HTTP response code', function () {
                expect(ajaxResponse.getStatusCode()).toEqual(jqXHR.status);
            });

        });

        describe('and with a failed AJAX response', function() {

            var jqXHR = testData.jqXHR.getInternalServerError();
            var status = dataConst.JQXHR_STATUS.ERROR;

            beforeEach(function() {
                ajaxResponse = factory(null, status, jqXHR, jqXHR.statusText);
            });

            it('and it should create the object with the text of the AJAX response', function () {
                expect(ajaxResponse.getMessage()).toEqual(jqXHR.statusText);
            });
            it('should create the object, but data is undefined', function () {
                expect(ajaxResponse.getData()).toBeUndefined();
            });
            it('should create the object with a error response status', function () {
                expect(ajaxResponse.getStatus()).toEqual(dataConst.REQUEST_STATUS.ERROR);
            });
            it('should create the object with the correct HTTP response code', function () {
                expect(ajaxResponse.getStatusCode()).toEqual(jqXHR.status);
            });

        });

        describe('and undefined for remaining parameters', function() {
            it('and it should create an empty response object', function () {
                ajaxResponse = factory(null);
                expect(ajaxResponse.getData()).toBeUndefined()
                expect(ajaxResponse.getMessage()).toBeUndefined();
                expect(ajaxResponse.getStatus()).toBeUndefined();
                expect(ajaxResponse.getStatusCode()).toBeUndefined();
            });
        });

        describe('and null for remaining parameters', function() {
            it('and it should create an empty response object', function () {
                ajaxResponse = factory(null, null, null, null);
                expect(ajaxResponse.getData()).toBeUndefined()
                expect(ajaxResponse.getMessage()).toBeUndefined();
                expect(ajaxResponse.getStatus()).toBeUndefined();
                expect(ajaxResponse.getStatusCode()).toBeUndefined();
            });
        });
    });


    describe('test constructor with a properly formed JSON body', function() {
        describe('which resulted from a successful request', function() {

            var jsonResponse = testData.jsonResponseData.getSuccessResponse(),
                jqXHR = testData.jqXHR.getOk();

            var ajaxResponse;

            beforeEach(function() {
                ajaxResponse = factory(jsonResponse, undefined, jqXHR);
            });

            it('getData() should return jsonResponse data', function () {
                expect(ajaxResponse.getData()).toEqual(jsonResponse.data);
            });
            it('getStatus() should return jsonResponse status', function () {
                expect(ajaxResponse.getStatus()).toEqual(jsonResponse.status);
            });
            it('getMessage() should return jsonResponse message', function () {
                expect(ajaxResponse.getMessage()).toEqual(jsonResponse.message);
            });
            it('getStatusCode() should return the HTTP response code', function () {
                expect(ajaxResponse.getStatusCode()).toEqual(jqXHR.status);
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
        describe('which resulted from a failed request', function() {

            var jsonResponse = testData.jsonResponseData.getFailResponse(),
                jqXHR = testData.jqXHR.getOk();

            var ajaxResponse;

            beforeEach(function() {
                ajaxResponse = factory(jsonResponse, undefined, jqXHR);
            });

            it('getData() should return jsonResponse data', function () {
                expect(ajaxResponse.getData()).toEqual(jsonResponse.data);
            });
            it('getStatus() should return jsonResponse status', function () {
                expect(ajaxResponse.getStatus()).toEqual(jsonResponse.status);
            });
            it('getMessage() should return jsonResponse message', function () {
                expect(ajaxResponse.getMessage()).toEqual(jsonResponse.message);
            });
            it('getStatusCode() should return the HTTP response code', function () {
                expect(ajaxResponse.getStatusCode()).toEqual(jqXHR.status);
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
        describe('test constructor with error response', function() {

            var jsonResponse = testData.jsonResponseData.getErrorResponse(),
                jqXHR = testData.jqXHR.getInternalServerError();

            var ajaxResponse;

            beforeEach(function() {
                ajaxResponse = factory(jsonResponse, undefined, jqXHR);
            });

            it('getData() should return jsonResponse data', function () {
                expect(ajaxResponse.getData()).toEqual(jsonResponse.data);
            });
            it('getStatus() should return jsonResponse status', function () {
                expect(ajaxResponse.getStatus()).toEqual(jsonResponse.status);
            });
            it('getMessage() should return jsonResponse message', function () {
                expect(ajaxResponse.getMessage()).toEqual(jsonResponse.message);
            });
            it('getStatusCode() should return the HTTP response code', function () {
                expect(ajaxResponse.getStatusCode()).toEqual(jqXHR.status);
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


    describe('test constructor a JSON body that doesn\'t contain a message', function() {
        describe('from a successful server response', function () {

            var jsonResponse = testData.jsonResponseData.getSuccessResponse(),
                ajaxResponse;

            jsonResponse.message = undefined;

            beforeEach(function () {
                ajaxResponse = factory(jsonResponse, undefined, testData.jqXHR.getOk());
            });

            it('where getStatusMessage() should return undefined', function () {
                expect(ajaxResponse.getMessage()).toEqual(undefined);
            });
        });
        describe('from a failed server response', function () {

            var jsonResponse = testData.jsonResponseData.getFailResponse(),
                ajaxResponse;

            jsonResponse.message = undefined;

            beforeEach(function () {
                ajaxResponse = factory(jsonResponse, undefined, testData.jqXHR.getOk()); // Fails from server are sent with 200 OK
            });

            it('where getStatusMessage() should return a generic fail message', function () {
                expect(ajaxResponse.getMessage()).toEqual('Failed with no additional detail from the server');
            });
        });
        describe('from an error server response', function () {

            var jsonResponse = testData.jsonResponseData.getErrorResponse(),
                jqXHR = testData.jqXHR.getInternalServerError();

            jsonResponse.message = undefined;

            var error = jqXHR.statusText;
            var ajaxResponse;

            beforeEach(function () {
                ajaxResponse = factory(jsonResponse, undefined, jqXHR, error);
            });

            it('where getMessage() should default to the AJAX error', function () {
                expect(ajaxResponse.getMessage()).toEqual(error);
            });
        });
    });


});