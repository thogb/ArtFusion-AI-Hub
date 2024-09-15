const AppError = require('../utils/appError');

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, req, res) => {
    // A) API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }
}
const sendErrorProd = (err, req, res) => {
    // a) API
    if (req.originalUrl.startsWith('/api')) {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                staus: err.status,
                message: err.message
            });
        }
        // Programming or other unknow error: don't leak error details
        // 1) Log error
        console.error('ERROR 💥!!', err);
        // 2) Send genric message
        return res.status(500).json({
            staus: 'error',
            message: 'Something went very wrong! (in production)'
        });
    }
    // b) render website
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
        });
        // Programming or other unknow error: don't leak error details
    }
    // 1) Log error
    console.error('ERROR 💥!!', err);
    // 2) Send genric message
    return res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: 'please try again later'
    });
};

module.exports = (err, req, res, next)=>{

    err.statusCode = err.statusCode || 500;
    err.status =err.status || 'error';

    if(process.env.NODE_ENV ==='development'){
        sendErrorDev(err,res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };

        error.message = err.message;
        if(error.name ==='CastError')error = handleCastErrorDB(error)
        sendErrorProd(error, req, res);
    }
}