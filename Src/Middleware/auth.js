import jwt from "jsonwebtoken";
import userModel from '../../DB/models/User.model.js';
import adminModel from '../../DB/models/Admin.model.js';
import {AppError} from "../../AppError.js";
export const roles ={
    SuperAdmin: 'super_admin',
    Admin : 'admin',
    User : 'user',
}
export const auth = (accessRole = []) =>{
    return async(req,res,next)=>{
        try{
            const {authorization}= req.headers;
            if(!authorization || !authorization.startsWith(process.env.BERERTOKEN)){
                return next(new AppError("invalid token format",400));
            }
            const token = authorization.split(process.env.BERERTOKEN)[1];
            const decoded = jwt.verify(token,process.env.LOGINSIGNATURE);
            if(!decoded){
                return next(new AppError("invalid token",400));
            }
            req.id = decoded.id;
            let user = await userModel.findById(req.id).select("userName role");
            if (!user) {
                user = await adminModel.findById(req.id).select("userName role");
            }
            if (!user) {
                return next(new AppError("User not found", 404));
            }
            if(!accessRole.includes(user.role)){
                return next(new AppError("You dont have Authorization",403));
            }
            next();
        }catch(err){
            return res.status(500).json({message:"catch error",error:err.stack});
        }
    }
}
