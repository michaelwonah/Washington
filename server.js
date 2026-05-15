require('dotenv').config()
require('./model/user')
const mongoose = require('mongoose')
const express = require ('express')
const PORT = process.env.PORT
const swagger = require('./documentation')
const userRouter = require('./routes/userRouter')


const app = express(); 
app.use(express.json()); 


mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log('Database connected successfully');

    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})  
}).catch((error)=>{  
    console.log('Unable to connect:', error.message); 
               
})     