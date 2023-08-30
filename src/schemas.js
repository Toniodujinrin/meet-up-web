import Joi from "joi-browser";


    export const getUserSchema = Joi.object({
       email:Joi.string().required().email({minDomainSegments:2}).min(2).max(50)
    })
    export const signUpSchema  = Joi.object({
        email:Joi.string().email().required().min(2).max(50).label("Email"),
        password:Joi.string().required().min(3).max(50).label("Password")
    })
    export const verifyAccountSchema = Joi.object({
        username:Joi.string().required().min(2).max(50).label("Username"),
        firstName:Joi.string().required().min(2).max(50).label("First Name"),
        lastName:Joi.string().required().min(2).max(50).label("Last Name"), 
        phone:Joi.string().required().label("Phone"),
        bio:Joi.string().required().label("Bio")
    })
    export const verifyEmailSchema = Joi.object({
        otp:Joi.string().required().label("Code")
    })
    export const updateUserSchema =  Joi.object({
        username:Joi.string().min(2).max(50),
        firstName:Joi.string().min(2).max(50),
        lastName:Joi.string().min(2).max(50), 
        phone:Joi.string(),
        bio:Joi.string()
    })


