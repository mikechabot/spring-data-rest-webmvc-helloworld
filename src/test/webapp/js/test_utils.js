var promiseUtil = {
    getPromise: function() {
        var deferred = $.Deferred();
        return deferred.promise();
    },
    getResolvedPromise: function(data) {
        var deferred = $.Deferred();
        deferred.resolve(data);
        return deferred.promise();
    },
    getRejectedPromise: function(error) {
        var deferred = $.Deferred();
        deferred.reject(error);
        return deferred.promise();
    }
};