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


const app = express(); 
app.use(express.json()); 

app.use('/apisDocs', swaggerUi.serve, swaggerUi.setup(swagger))

app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/booking', bookingRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/customer', customerRouter)

 
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Database connected successfully');
      
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})  
}).catch((error)=>{  
    console.log('Unable to connect:', error.message); 
               
})     
