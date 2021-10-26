const mongoose = require('mongoose')
const Joi=require('joi')
const Schema = mongoose.Schema

const Author=new Schema({
    name:{
        type: String,
        required: true,
    },

    post_id:{
        type: String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required:true,
    },
    roles:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role"
        }
    ]
})

function validateAuthor(Author){
    const JoiSChema=Joi.object({
     name:Joi.string().required(),
     post_id:Joi.string().required(),
     email:Joi.string().required(),
     password:Joi.string().required(),
    }).options({abortEarly:false});
return JoiSChema.validate(Author)
}
module.exports.Author = mongoose.model('Author', Author)
module.exports.validateAuthor = validateAuthor