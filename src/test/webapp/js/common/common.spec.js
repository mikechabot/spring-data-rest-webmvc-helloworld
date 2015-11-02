describe('common.js', function() {

    describe('hasValue(object)', function() {

        it("should return false if passed null", function() {
            expect(angular.hasValue(null)).toEqual(false);
        });
        it("should return false if passed undefined", function() {
            expect(angular.hasValue(undefined)).toEqual(false);
        });
        it("should return true passed an empty String", function() {
            expect(angular.hasValue('')).toEqual(true);
        });
        it("should return true passed an empty array", function() {
            expect(angular.hasValue([])).toEqual(true);
        });
        it("should return true passed an empty object", function() {
            expect(angular.hasValue({})).toEqual(true);
        });
        it("should return true passed a function ", function() {
            expect(angular.hasValue({key: 'value'})).toEqual(true);
        });
        it("should return true if passed a boolean (false)", function() {
            expect(angular.hasValue(false)).toEqual(true);
        });
        it("should return true if passed a boolean (true)", function() {
            expect(angular.hasValue(true)).toEqual(true);
        });
        it("should return true if passed an object", function() {
            expect(angular.hasValue({key: 'value'})).toEqual(true);
        });

    });

});