import userModel from '../../../DB/models/User.model.js';
import adminModel from '../../../DB/models/Admin.model.js';
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";
import {AppError} from "../../../AppError.js";

export const register = async(req,res,next)=>{
    
        const {userName, email, password,role} = req.body;
        const user = await userModel.findOne({email});
        if(user){
            return next(new AppError("Email already exists",409));

        }
        const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALROUND));
        await userModel.create({
            userName,
            email,
            password: hashPassword,
            role
        });
        return res.status(201).json({message:"success"});
}

export const login = async(req,res,next)=>{

        const {email,password}= req.body;
        let user = await userModel.findOne({email});
        if (!user) {
            user = await adminModel.findOne({ email });
        }
        if(!user){
            return next(new AppError("user not found",404));
        }
        const check = await bcrypt.compareSync(password,user.password);
        if(!check){
            return next(new AppError("invalid password",400));
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.LOGINSIGNATURE, { expiresIn: '30d' });
        return res.status(200).json({Message:"success",token});
}