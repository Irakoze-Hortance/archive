
// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://hortance:hortance@cluster0.0pkui.mongodb.net/saintly?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("saintly").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

module.exports={
    HOST:"localhost",
    PORT:27017,
    DB:"saintly"
}