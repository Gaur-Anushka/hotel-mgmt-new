const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app=express();
const roomBooking = require('./Routes/booking')
const cookieparser = require('cookie-parser')
dotenv.config();


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
}));


app.use(express.json())
app.use(cookieparser())
const connectDB = require('./Config/db')
connectDB();

app.get('/',(req,res)=>{
    res.send('Hotel mgmt ')
})
app.use('/api', require('./Routes/auth'));
app.use('/api/rooms', require('./Routes/room'));
app.use('/api/booking',roomBooking)

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is connected at ${PORT}`)
})
