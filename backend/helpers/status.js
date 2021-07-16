const SuccessResponse = (code, message, data) => obj = {
    statusCode: code,
    payload: {
        msg: message,
        data: data
    }
}



const ErrorResponse = (code, message, error) => obj = {
    statusCode: code,
    payload: {
        ErrorMessage: message,
        error: error
    }
}

module.exports = {
    SuccessResponse,
    ErrorResponse
}