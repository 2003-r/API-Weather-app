const ErrorResponse = require('../utils/errorResponse');
const errorHandler = (err, req, res, next) => {
    let error = {...err}

    error.message = err.message;

    // log to console for dev
    console.log(err);
    
    //Mangoose bad ObjectId
    if(err.city === 'CastError'){
        const message = `Resource not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    });
}

module.exports = errorHandler;