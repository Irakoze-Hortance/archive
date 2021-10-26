const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors')

require('./DB/db')
const app=express()
const port=8000
// const flightRouter=require('./routes/flightRoute')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

// app.use('/api',flightRouter)
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})