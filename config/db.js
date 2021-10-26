const mongoose=require('mongoose')

mongoose.connect('localhost:27017/saintly',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Db connected!")
})
.catch(e=>{
    console.error('Connection error',e.message)
})

const db=mongoose.connection

module.exports=db