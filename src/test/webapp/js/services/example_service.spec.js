describe('example_service.js', function() {

    var service = undefined,
        dataAccessService = {},
        baseUrl = {};

    beforeEach(function() {
        baseUrl = '/example';
        module('test', function($provide) {
            $provide.value('DataAccessService', dataAccessService);
        });
    });

    beforeEach(inject(function(ExampleService) {
        service = ExampleService;
    }));

    describe('getExampleData()', function() {

        beforeEach(function() {
            dataAccessService.get = jasmine.createSpy('dataAccessService get() spy').and.returnValue(promiseUtil.getPromise());
        });

        it('should call the correct rest url', function () {
            service.getExampleData();
            expect(dataAccessService.get).toHaveBeenCalledWith(baseUrl);
        });

        afterEach(function() {
            dataAccessService = {};
        });

    });

    describe('createExampleData()', function() {

        beforeEach(function() {
            dataAccessService.post = jasmine.createSpy('dataAccessService post() spy').and.returnValue(promiseUtil.getPromise());
        });

        it('should call the correct rest url', function () {
            var name = 'foobar';
            service.createExampleData(name);
            expect(dataAccessService.post).toHaveBeenCalledWith(baseUrl + '/create', name);
        });

        afterEach(function() {
            dataAccessService = {};
        });

    });

    describe('clearCollection()', function() {

        beforeEach(function() {
            dataAccessService.post = jasmine.createSpy('dataAccessService post() spy').and.returnValue(promiseUtil.getPromise());
        });

        it('should call the correct rest url', function () {
            service.clearCollection();
            expect(dataAccessService.post).toHaveBeenCalledWith(baseUrl + '/delete/all');
        });

        afterEach(function() {
            dataAccessService = {};
        });

    });


});