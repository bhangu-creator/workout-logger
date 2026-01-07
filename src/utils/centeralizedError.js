//initialzing the application error class to handle any error occured in backend
class AppError extends Error
{
    constructor(statusCode,message)
    {
        super(message)
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
    
}

module.exports= AppError;