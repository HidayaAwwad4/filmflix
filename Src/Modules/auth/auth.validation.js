import joi from "joi";
import { generalFields } from "../../Middleware/validation.js";

export const registerSchema ={
    body:joi.object ({
        userName: generalFields.userName,
        email: generalFields.email,
        password: generalFields.password,
        cpassword: joi.valid(joi.ref('password')).required(),
        role: joi.string(),

    })
}
export const loginSchema ={
    body:joi.object({
        email:generalFields.email,
        password: generalFields.password,
    })
}