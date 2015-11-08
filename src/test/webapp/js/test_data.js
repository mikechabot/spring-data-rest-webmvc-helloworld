var testData = {
    ajax: {
        testUrl: '/test',
        options: {
            get: {
                type: 'GET',
                dataType: 'json',
                url: '/test'
            },
            post: {
                type: 'POST',
                dataType: 'json',
                url: '/test'
            }
        },
        optionsWithData: {
            post: {
                type: 'POST',
                dataType: 'json',
                url: '/test',
                data: 123,
                contentType: 'application/json'
            }
        }
    },
    jsonResponseData: {
        getSuccessResponse: function() {
            return {
                data: 123,
                status: 'SUCCESS',
                message: 'This was a successful response'
            }
        },
        getFailResponse: function() {
            return {
                data: 123,
                status: 'FAIL',
                message: 'This was a failed response'
            }
        },
        getErrorResponse: function() {
            return {
                data: 123,
                status: 'ERROR',
                message: 'This was an error response'
            }
        }
    },
    jqXHR: {
        getOk: function() {
            return {
                status: 200,
                statusText: 'OK'
            }
        },
        getInternalServerError: function() {
            return {
                status: 500,
                statusText: 'Internal Server Error'
            }
        }
    }
};