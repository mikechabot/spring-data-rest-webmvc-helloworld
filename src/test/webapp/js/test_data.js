var testData = {
    simpleObject: {

    },
    jsonResponseData: {
        getSuccessResponse: function() {
            return {
                data: 123,
                status: 'SUCCESS',
                statusMessage: 'This was a successful response'
            }
        },
        getFailResponse: function() {
            return {
                data: 123,
                status: 'FAIL',
                statusMessage: 'This was a failed response'
            }
        },
        getErrorResponse: function() {
            return {
                data: 123,
                status: 'ERROR',
                statusMessage: 'This was an error response'
            }
        }
    },
    jqXHR: {
        getInternalServerError: function() {
            return {
                status: 500,
                statusText: 'Internal Server Error'
            }
        }
    }
};