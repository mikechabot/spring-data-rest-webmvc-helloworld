describe('data_services.js', function() {

    describe('DataAccessService', function() {

        var service = undefined;

        describe('should return the correct data when resolving the promise for a', function () {

            var _data = 123;

            beforeEach(function () {
                module('test', function ($provide) {
                    $provide.value('AjaxRequestFactory', function() {
                        return promiseUtil.getResolvedPromise({
                            getData: function() {
                                return _data
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
                        expect(data).toEqual(_data);
                    })
            });

            it('POST request', function() {
                var promise = service.post('url');
                promise
                    .done(function(data) {
                        expect(data).toEqual(_data);
                    })
            });

        });

        describe('should return the correct data after rejecting the promise for a', function () {

            var _data = 123;

            beforeEach(function () {
                module('test', function ($provide) {
                    $provide.value('AjaxRequestFactory', function() {
                        return promiseUtil.getRejectedPromise({
                            getData: function() {
                                return _data;
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
                    .fail(function(data) {
                        expect(data).toEqual(_data);
                    })
            });

            it('POST request', function() {
                var promise = service.post('url');
                promise
                    .fail(function(data) {
                        expect(data).toEqual(_data);
                    })
            });

        });

        describe('should throw errors for', function () {

            var error = new Error('URL cannot be null, undefined, or empty');

            beforeEach(function () {
                module('test', function ($provide) {
                    $provide.value('AjaxRequestFactory', function() {
                        return promiseUtil.getRejectedPromise(error);
                    });
                });
            });
            beforeEach(inject(function (DataAccessService) {
                service = DataAccessService;
            }));

            it('GET requests without a url', function() {
                var promise = service.get();
                promise
                    .fail(function(data) {
                        expect(data).toEqual(error);
                    })

                var promise = service.get(null);
                promise
                    .fail(function(data) {
                        expect(data).toEqual(error);
                    })

                var promise = service.get(undefined);
                promise
                    .fail(function(data) {
                        expect(data).toEqual(error);
                    })
            });

            it('POST requests without a url', function() {
                var promise = service.post();
                promise
                    .fail(function(data) {
                        expect(data).toEqual(error);
                    })

                var promise = service.post(null);
                promise
                    .fail(function(data) {
                        expect(data).toEqual(error);
                    })

                var promise = service.post(undefined);
                promise
                    .fail(function(data) {
                        expect(data).toEqual(error);
                    })
            });


        });

    });


});