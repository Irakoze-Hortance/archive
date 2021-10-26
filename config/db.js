

module.exports={
    HOST:"localhost",
    PORT:27017,
    DB:"saintly"
    .then(()=>{
        console.log("Db connected!")
    })
    .catch(e=>{
        console.error('Connection error',e.message)
    })
}