const mongoose=require('mongoose');
mongoose.Promise = global.Promise;

const db={};
db.mongoose=mongoose;
db.author=require('.authorModel');
db.role=require('./roleModel');

db.ROLES=['user','admin','moderator'];
module.exports=db;