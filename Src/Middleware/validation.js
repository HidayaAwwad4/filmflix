import joi from "joi";
const dataMethods = ['body', 'params', 'query', 'headers', 'cookies'];
export const generalFields= {
    userName: joi.string().min(3).max(30).required().messages({
        'string.base': `"userName" should be a type of 'text'`,
        'string.empty': `"userName" cannot be an empty field`,
        'string.min': `"userName" should have a minimum length of {#limit}`,
        'string.max': `"userName" should have a maximum length of {#limit}`,
        'any.required': `"userName" is a required field`,
    }),
    email: joi.string().email().min(6).max(50).required().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.empty': `"email" cannot be an empty field`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is a required field`,
    }),
    password: joi.string().min(8).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of {#limit}`,
        'any.required': `"password" is a required field`,
    }),
}
const validation = (schema)=>{
    return (req,res,next)=>{
        const validationArray = [];
        dataMethods.forEach(key=>{
            if(schema[key]){
                const validationResult = schema[key].validate(req[key],{abortEarly:false});
                if(validationResult.error){
                    validationArray.push(validationResult.error.details);
                }
            }
        });
        if(validationArray.length > 0){
            return res.status(400).json({message:"validation Error",Errors:validationArray});
        }else{
            next();
        }
    }
} 
export default validation;