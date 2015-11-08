describe('data_services.js', function() {

    describe('DataAccessService', function() {

        var service = undefined;

        describe('should return the correct data when resolving the promise', function () {

            var testData = 123;

            beforeEach(function () {
                module('test', function ($provide) {
                    $provide.value('AjaxRequestFactory', function() {
                        return promiseUtil.getResolvedPromise({
                            getData: function() {
                                return testData;
                            }
                        });
                    });
                });
            });

            beforeEach(inject(function (DataAccessService) {
                service = DataAccessService;
            }));

            it('GET request', function() {
                var promise = service.get('url');
                promise
                    .done(function(data) {
                        expect(data).toEqual(testData);
                    })
            });

            it('POST request', function() {
                var promise = service.post('url');
                promise
                    .done(function(data) {
                        expect(data).toEqual(testData);
                    })
            });

        });

        describe('should return the correct data after rejecting the promise', function () {

            beforeEach(function () {
                module('test', function ($provide) {
                    $provide.value('AjaxRequestFactory', function() {
                        return promiseUtil.getRejectedPromise({
                            getData: function() {
                                return testData;
                            }
                        });
                    });
                });
            });
            beforeEach(inject(function (DataAccessService) {
                service = DataAccessService;
            }));


            var ajaxRequestFactory = function() {
                return promiseUtil.getRejectedPromise({
                    getData: function() {
                        return testData;
                    }
                });
            };

            it('GET request', function() {
                var promise = service.get('url');
                promise
                    .fail(function(data) {
                        expect(data).toEqual(testData);
                    })
            });

            it('POST request', function() {
                var promise = service.post('url');
                promise
                    .fail(function(data) {
                        expect(data).toEqual(testData);
                    })
            });

        });

    });


});