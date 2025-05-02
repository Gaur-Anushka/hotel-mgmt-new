const mongoose = require('mongoose')


const connectDB=()=>
    {mongoose.connect(process.env.MONGO_URL)
   .then(()=>{
    console.log('mongoose connected')
   })
   .catch((err)=>{
    console.log('err',err)
   })
}

module.exports = connectDB;