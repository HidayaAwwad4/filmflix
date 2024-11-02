import {AppError} from "../../AppError.js";

export const asyncHandler = (func)=>{
    return async (req,res,next)=>{
        try{
            await func(req, res, next);
        }
        catch(error){
            console.error(error);
            const message = error.message || "Internal Server Error";
            const statusCode = error.statusCode || 500;
            next(new AppError(message, statusCode));
        }
    }
}