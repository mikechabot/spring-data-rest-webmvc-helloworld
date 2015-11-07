var testData = {
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