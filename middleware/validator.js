const joi = require('joi')

exports.signUpValidator = (req, res, next)=>{
    const schema = joi.object({
        firstName: joi.string().trim().pattern(/^[A-Za-z\s]{4,}$/).required().messages({
        'any.required': "firstName is required",
         "string.empty": "firstName cannot be empty",
        'string.pattern.base': "firstName must be at least 4 characters long and contain only letters and spaces"
         }),
        lastName: joi.string().trim().pattern(/^[A-Za-z\s]{4,}$/).required().messages({
            'any.required': "lastName is required",
            "string.empty": "lastName cannot be empty",
            'string.pattern.base': "lastName must be at least 4 characters long and contain only letters and spaces"
        }),
        email: joi.string().email().required().messages({
            'any.required': "email is required",
            'string.empty': "email cannot be empty",
            "string.email": "email must be a valid email"
        }),
        phoneNumber: joi.string().pattern(/^\d{11}$/).required().messages({
            'any.required': "phone number is required",
            "string.empty": "phone number cannot be empty",
            'string.pattern.base': "phone number must be 11 digits long"
        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/).required().messages({
            'any.required': "password is required",
            "string.empty": "password cannot be empty",
            'string.pattern.base': "password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        })
    })
        const {error} = schema.validate(req.body);
    //console.log(error.details[0].message)
    if (error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.loginValidator = (req, res, next) => {   
    const schema = joi.object({
        email: joi.string().email().required().messages({
            'any.required': "email is required",
            'string.empty': "email cannot be empty",
            "string.email": "email must be a valid email"
        }),
        password: joi.string().required().messages({
            'any.required': "password is required",
            "string.empty": "password cannot be empty"
        })
    })

    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next()
}

exports.resetPasswordValidator = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required().messages({
            'any.required': "email is required",
            'string.empty': "email cannot be empty",
            "string.email": "email must be a valid email"
        }),
        otp: joi.string().pattern(/^\d{6}$/).required().messages({
            'any.required': "OTP is required",
            'string.empty': "OTP cannot be empty",
            "string.pattern.base": "OTP must only contain digits and be 6 digits"
        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/).required().messages({
            'any.required': "Password is required",
            "string.empty": "Password cannot be empty",
            'string.pattern.base': "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        }),
        confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
            "any.only": "Confirm password must match password",
            "any.required": "Confirm password is required"
        })
    })
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}


