const swagger = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info:{
            title: "WASHINGTON API",
            version: "1.0.0",
            description: "A simple expense splitting app"
        },
        servers:[
            {
                url:"http://localhost:5555",
                description: "Local development server"
            } 
        ],
        components:{
            securitySchemes: { 
                bearerAuth:{
                    type:'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis:[
        "./docs/admin.yaml","./docs/bookingForm.yaml","./docs/order.yaml","./docs/customer.yaml","./docs/businessName.yaml","./docs/password.yaml","./docs/pickupDelivery.yaml"
    ],
}

module.exports = swagger(options)
