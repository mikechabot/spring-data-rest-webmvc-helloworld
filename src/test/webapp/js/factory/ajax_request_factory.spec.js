describe('ajax_request_factory.js', function() {

    var factory = undefined,
        ajaxService = {
            request: function() {
                return promiseUtil.getResolvedPromise()
            }
        };
        var dataConst =  {
            BASE_SPRING_URL:  '',
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


    describe('should create the correct ajax options object (without data)', function () {

        beforeEach(function () {
            module('test', function ($provide) {
                $provide.value('AjaxResponseFactory', function() {
                    return {
                        isSuccess: function() {
                            return true;
                        },
                        hasMessage: function() {
                            return false;
                        }
                    }
                });
            });
        });

        beforeEach(inject(function(AjaxRequestFactory) {
            factory = AjaxRequestFactory;
        }));

        it('for GET requests', function() {
            var testOptions = testData.ajax.options.get;
            var promise = factory('GET', '/test');
            promise
                .done(function(ajaxRequestObject) {
                    expect(ajaxRequestObject.options).toEqual(testOptions);
                    expect(ajaxRequestObject.options.data).toBeUndefined();
                    expect(ajaxRequestObject.options.contentType).toBeUndefined();
                });
        });
        it('for POST requests', function() {
            var testOptions = testData.ajax.options.post;
            var promise = factory('POST', '/test');
            promise
                .done(function(ajaxRequestObject) {
                    expect(ajaxRequestObject.options).toEqual(testOptions);
                    expect(ajaxRequestObject.options.data).toBeUndefined();
                    expect(ajaxRequestObject.options.contentType).toBeUndefined();
                });
        });

    });

    describe('constructor should create the correct ajax options object (with data)', function () {

        beforeEach(function () {
            module('test', function ($provide) {
                $provide.value('AjaxResponseFactory', function() {
                    return {
                        isSuccess: function() {
                            return true;
                        },
                        hasMessage: function() {
                            return false;
                        }
                    }
                });
            });
        });

        beforeEach(inject(function(AjaxRequestFactory) {
            factory = AjaxRequestFactory;
        }));

        it('for POST requests', function() {
            var testOptions = testData.ajax.optionsWithData.post;
            var promise = factory('POST', '/test', 123);
            promise
                .done(function(ajaxRequestObject) {
                    expect(ajaxRequestObject.options).toEqual(testOptions);
                    expect(ajaxRequestObject.options.data).toEqual(123);
                    expect(ajaxRequestObject.options.contentType).toEqual(testOptions.contentType);
                });
        });

    });

    describe('constructor should create the correct response object', function () {

        var ajaxResponse = {
            isSuccess: function() {
                return true;
            },
            hasMessage: function() {
                return false;
            }
        };

        var ajaxResponseFactory = function() {
            return ajaxResponse;
        };

        beforeEach(function () {
            module('test', function ($provide) {
                $provide.value('AjaxResponseFactory', ajaxResponseFactory);
            });
        });

        beforeEach(inject(function(AjaxRequestFactory) {
            factory = AjaxRequestFactory;
        }));

        it('for GET requests', function() {
            var promise = factory('GET', '/test');
            promise
                .done(function(ajaxRequestObject) {
                    expect(ajaxRequestObject.response).toEqual(ajaxResponse);
                    expect(ajaxRequestObject.response.isSuccess()).toEqual(true);
                    expect(ajaxRequestObject.response.hasMessage()).toEqual(false);
                });
        });

        it('for POST requests', function() {
            var promise = factory('POST', '/test');
            promise
                .done(function(ajaxRequestObject) {
                    expect(ajaxRequestObject.response).toEqual(ajaxResponse);
                    expect(ajaxRequestObject.response.isSuccess()).toEqual(true);
                    expect(ajaxRequestObject.response.hasMessage()).toEqual(false);
                });
        });

    });

    describe('constructor should return an empty object if the type or URL are undefined, null or empty', function () {

        beforeEach(function () {
            module('test', function ($provide) {
                $provide.value('AjaxResponseFactory', function() {
                    return {
                        isSuccess: function() {
                            return true;
                        },
                        hasMessage: function() {
                            return false;
                        }
                    }
                });
            });
        });

        beforeEach(inject(function(AjaxRequestFactory) {
            factory = AjaxRequestFactory;
        }));

        it('for GET requests', function() {
            var promise = factory();
            promise
                .fail(function(ajaxRequestObject) {
                    expect(ajaxRequestObject.options).toBeUndefined();
                    expect(ajaxRequestObject.response).toBeUndefined();
                });
        });

        it('for POST requests', function() {
            var promise = factory();
            promise
                .fail(function(ajaxRequestObject) {
                    expect(ajaxRequestObject.options).toBeUndefined();
                    expect(ajaxRequestObject.response).toBeUndefined();
                });
        });

    });

});