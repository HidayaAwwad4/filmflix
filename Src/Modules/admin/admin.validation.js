import joi from "joi";
import { generalFields } from "../../Middleware/validation.js";

export const createAdminSchema = {
    body: joi.object({
        userName: generalFields.userName,
        email: generalFields.email,
        password: generalFields.password,
        cpassword: joi.valid(joi.ref('password')).required().messages({
            'any.only': `"cpassword" must match "password"`,
            'any.required': `"cpassword" is a required field`,
        }),
        role: joi.string().valid('admin', 'super_admin').required().messages({
            'any.only': `"role" must be one of 'admin', 'super_admin'`,
            'any.required': `"role" is a required field`,
        }),
        status: joi.string().valid('active', 'not_active').default('active'),
    })
};

export const updateAdminSchema = {
    body: joi.object({
        role: joi.string().valid('admin', 'super_admin').messages({
            'any.only': `"role" must be one of 'admin', 'super_admin'`,
        }),
        status: joi.string().valid('active', 'not_active').messages({
            'any.only': `"status" must be one of 'active', 'not_active'`,
        }),
    })
};
