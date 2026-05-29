const joi = require('joi')

exports.signUpValidator = (req, res, next)=>{
    const schema = joi.object({
        firstName: joi.string().trim().pattern(/^[A-Za-z\s]{4,}$/).required().messages({
        'any.required': "firstName is required",
         "string.empty": "firstName cannot be empty",
        'string.pattern.base': "firstName must be at least 4 characters long and contain only letters and spaces"
         }),
        lastName: joi.string().trim().pattern(/^[A-Za-z\s]{3,}$/).required().messages({
            'any.required': "lastName is required",
            "string.empty": "lastName cannot be empty",
            'string.pattern.base': "lastName must be at least 3 characters long and contain only letters and spaces"
        }),
        email: joi.string().email().required().messages({
            'any.required': "email is required",
            'string.empty': "email cannot be empty",
            "string.email": "email must be a valid email"
        }),
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/).required().messages({
            'any.required': "password is required",
            "string.empty": "password cannot be empty",
            'string.pattern.base': "password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        }),
        confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
            "any.only": "confirm password must match password",
            "string.empty": "confirm password cannot be empty",
            "any.required": "confirm password is required"
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

exports.newPasswordValidator = (req, res, next) => {
    const schema = joi.object({
        password: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/).required().messages({
            'any.required': "password is required",
            "string.empty": "password cannot be empty",
            'string.pattern.base': "password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        }),
        confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
            "any.only": "confirm password must match password",
            "string.empty": "confirm password cannot be empty",
            "any.required": "confirm password is required"
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


exports.bookLaundryValidator = (req, res, next)=>{
    const schema = joi.object({
        firstName: joi.string().trim().pattern(/^[A-Za-z\s]{2,}$/).required().messages({
        'any.required': "firstName is required",
         "string.empty": "firstName cannot be empty",
        'string.pattern.base': "firstName must be at least 2 characters long and contain only letters and spaces"
         }),
        surName: joi.string().trim().pattern(/^[A-Za-z\s]{2,}$/).required().messages({
            'any.required': "surName is required",
            "string.empty": "surName cannot be empty",
            'string.pattern.base': "surName must be at least 2 characters long and contain only letters and spaces"
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
        address: joi.string().min(3).max(500).trim().required().messages({
            'any.required': "Address is required",
            "string.empty": "Address cannot be empty",
            'string pattern.base': "Address cannot be less than 3 and must not be more than 500 characters"
        }),
        pickupDate: joi.string().trim().valid("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday").required().messages({
            "any.required": "Pickup day is required",
            "string.empty": "Pickup day cannot be empty",
            "any.only": "Pickup day must be a valid day of the week"
        }),
        pickupTime: joi.string().trim().pattern(/^((1[0-2])|([1-9])):[0-5][0-9](am|pm)$/i).required().messages({
            "any.required": "Pickup time is required",
            "string.empty": "Pickup time cannot be empty",
            "string.pattern.base": "Pickup time must be in this format: 10:00am"
        }),
        serviceType: joi.string().valid("basic", "deluxe", "premium").required().messages({
            'any.required': "Service type is required",
            "string.empty": "Service type cannot be empty",
            'string pattern.base': "Service type must be either daily, weekly, or monthly"
        }),
        amount: joi.number().required().messages({
            "any.required": "Amount is required",
            "number.base": "Amount must be a number"
        }),
        servicePackage: joi.string().valid("individual service", "packaged service").required().messages({
            'any.required': "Service package is required",
            "string.empty": "Service package cannot be empty",
            'string pattern.base': "Service package must be either daily, weekly, or monthly"
        }),
        specialInstruction: joi.string().min(3).max(500).trim().required().messages({
            'any.required': "Special instruction is required",
            "string.empty": "Special instruction cannot be empty",
            'string pattern.base': "Special instruction cannot be less than 3 and must not be more than 500 characters"
        }),
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
exports.createOrderValidator = (req, res, next)=>{
    const schema = joi.object({
        name: joi.string().trim().pattern(/^[A-Za-z\s]{2,}$/).required().messages({
        'any.required': "name is required",
         "string.empty": "name cannot be empty",
        'string.pattern.base': "name must be at least 2 characters long and contain only letters and spaces"
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
        address: joi.string().min(3).max(500).trim().required().messages({
            'any.required': "Address is required",
            "string.empty": "Address cannot be empty",
            'string pattern.base': "Address cannot be less than 3 and must not be more than 500 characters"
        }),
        assignedDriver: joi.string().min(3).max(500).trim().required().messages({
            'any.required': "Assigning of driver is required",
            "string.empty": "Assigning of driver cannot be empty",
            'string pattern.base': "Assigning of driver cannot be less than 3 and must not be more than 500 characters"
        }),
        pickupDate: joi.string().trim().valid("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday").required().messages({
            "any.required": "Pickup day is required",
            "string.empty": "Pickup day cannot be empty",
            "any.only": "Pickup day must be a valid day of the week"
        }),
        pickupTime: joi.string().trim().pattern(/^((1[0-2])|([1-9])):[0-5][0-9](am|pm)$/i).required().messages({
            "any.required": "Pickup time is required",
            "string.empty": "Pickup time cannot be empty",
            "string.pattern.base": "Pickup time must be in this format: 10:00am"
        }),
        serviceType: joi.string().valid("basic", "deluxe", "premium").required().messages({
            'any.required': "Service type is required",
            "string.empty": "Service type cannot be empty",
            'string pattern.base': "Service type must be either daily, weekly, or monthly"
        }),
        servicePackage: joi.string().valid("individual service", "packaged service").required().messages({
            'any.required': "Service package is required",
            "string.empty": "Service package cannot be empty",
            'string pattern.base': "Service package must be either daily, weekly, or monthly"
        }),
        amount: joi.number().required().messages({
            "any.required": "Amount is required",
            "number.base": "Amount must be a number"
        }),
        specialInstruction: joi.string().min(3).max(500).trim().required().messages({
            'any.required': "Special instruction is required",
            "string.empty": "Special instruction cannot be empty",
            'string pattern.base': "Special instruction cannot be less than 3 and must not be more than 500 characters"
        }),
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
exports.assignedDriverValidator = (req, res, next)=>{
    const schema = joi.object({
        assignedDriver: joi.string().min(3).max(500).trim().required().messages({
            'any.required': "Assigning of driver is required",
            "string.empty": "Assigning of driver cannot be empty",
            'string pattern.base': "Assigning of driver cannot be less than 3 and must not be more than 500 characters"
        }),
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

exports.pickupDeliveryValidator = (req, res, next) => {
    const schema = joi.object({
        orderId: joi.string().hex().length(24).required().messages({
            'any.required': 'Order id is required',
            'string.empty': 'Order id cannot be empty',
            'string.hex': 'Order id must be a valid id',
            'string.length': 'Order id must be 24 characters long'
        }),
        clientName: joi.string().trim().min(2).max(100).required().messages({
            'any.required': 'Client name is required',
            'string.empty': 'Client name cannot be empty',
            'string.min': 'Client name cannot be less than 2 characters',
            'string.max': 'Client name cannot be more than 100 characters'
        }),
        contact: joi.string().trim().min(5).max(50).required().messages({
            'any.required': 'Contact is required',
            'string.empty': 'Contact cannot be empty',
            'string.min': 'Contact cannot be less than 5 characters',
            'string.max': 'Contact cannot be more than 50 characters'
        }),
        status: joi.string().valid('scheduled', 'inprogress', 'completed').default('scheduled').messages({
            'any.only': 'Status must be either scheduled, inprogress, or completed'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.pickupDeliveryStatusValidator = (req, res, next) => {
    const schema = joi.object({
        status: joi.string().valid('scheduled', 'inprogress', 'completed').required().messages({
            'any.required': 'Status is required',
            'string.empty': 'Status cannot be empty',
            'any.only': 'Status must be either scheduled, inprogress, or completed'
        })
    })

    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.businessNameValidator = (req, res, next) =>{
    const schema = joi.object({
        adminId: joi.string().hex().length(24).required().messages({
            'any.required': 'admin id is required',
            'string.empty': 'admin id cannot be empty',
            'string.hex': 'admin id must be a valid id',
            'string.length': 'admin id must be 24 characters long'
        }), 
        businessName: joi.string().trim().min(2).max(100).required().messages({
            'any.required': 'business name is required',
            'string.empty': 'business name cannot be empty',
            'string.min': 'business name cannot be less than 2 characters',
            'string.max': 'business name cannot be more than 100 characters'
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
         address: joi.string().min(3).max(50).trim().required().messages({
            'any.required': "Address is required",
            "string.empty": "Address cannot be empty",
            'string pattern.base': "Address cannot be less than 3 and must not be more than 50 characters"
        }),
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}

exports.passwordChangeValidator = (req, res, next) => {
    const schema = joi.object({
        currentPassword: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/).required().messages({
            'any.required': "Current password is required",
            "string.empty": "Current password cannot be empty",
            'string.pattern.base': "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        }),
        newPassword: joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/).required().messages({
            'any.required': "New password is required",
            "string.empty": "New password cannot be empty",
            'string.pattern.base': "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character"
        }),
        confirmNewPassword: joi.string().required().valid(joi.ref('newPassword')).messages({
            "any.only": "Confirm new password must match new password",
            'any.required': "Confirm new password is required",
            "string.empty": "Confirm new password cannot be empty",
        })
    })
    const { error } = schema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }
    next()
}
