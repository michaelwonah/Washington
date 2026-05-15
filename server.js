require('dotenv').config()
require('./model/user')
const swaggerUi = require('swagger-ui-express')
const mongoose = require('mongoose')
const express = require ('express')
const PORT = process.env.PORT
const swagger = require('./documentation')
const userRouter = require('./routes/userRouter')


const app = express(); 
app.use(express.json()); 

app.use('/apisDocs', swaggerUi.serve, swaggerUi.setup(swagger))

app.use('/api/v1/user', userRouter)

 
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Database connected successfully');
      
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})  
}).catch((error)=>{  
    console.log('Unable to connect:', error.message); 
               
})     