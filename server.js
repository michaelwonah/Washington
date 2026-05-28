require('dotenv').config()
const swaggerUi = require('swagger-ui-express')
const mongoose = require('mongoose')
const express = require ('express')
const PORT = process.env.PORT
const swagger = require('./documentation')
const adminRouter = require('./routes/adminRouter')
const bookingRouter = require('./routes/bookingForm')
const orderRouter = require('./routes/order')
const customerRouter = require('./routes/customer')
const pickupDeliveryRouter = require('./routes/pickupDelivery')
const businessNameRouter = require('./routes/businessName')
const passwordRouter = require('./routes/password')
const cors = require('cors')    


const app = express(); 
app.use(cors());
app.use(express.json()); 

app.use('/apisDocs', swaggerUi.serve, swaggerUi.setup(swagger))

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/booking', bookingRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/customer', customerRouter)
app.use('/api/v1/pickup-delivery', pickupDeliveryRouter)
app.use('/api/v1/business-name', businessNameRouter)
app.use('/api/v1/password', passwordRouter)

 
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Database connected successfully');
      
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})  
}).catch((error)=>{  
    console.log('Unable to connect:', error.message); 
               
})     
