const config=require("../config/authConfig");
const db=require("../Models");
const Author=db.author;
const Role=db.role;

var jwt=require("jsonwebtoken");
var bcrypt=require("bcrypt");
exports.signup=(req,res) => {
    const author=new Author({
        post_id:req.body.post_id,
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    });
    author.save((err,author) => {
        if(err){
            res.status(500).send({message:err.message});
            return;
        }
        if(req.body.roles){
            Role.find(
                {
                    name:{$in:req.body.roles},
                },(err,roles)=>{
                    if (err) {
                        res.status(500).send({ message: err });
                        return;   
                }
                author.roles=roles.map(role=>role._id);
                author.save(err=>{
                    if(err){
                        res.status(500).send({ message: err });
                        return;  
                    }
                    res.send({ message: "Author was registered successfully!" });
                });
        }
    );
}else{
    Role.findOne({name:"user"},(err,role)=>{
        if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          user.roles = [role._id];
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
  
            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
}

exports.signin=(req,res)=>{
    Author.findOne({
        post_id:req.body.post_id,
    })
    .populate("roles","__v")
    .exec((err,author)=>{
        if(err){
            res.status(500).send({ message: err});
            return;
        }
        if(!author){
            return res.status(404).send({ message:"Author not found!" });
        }
        var passwordIsValid=bcrypt.compareSync(
            req.body.password,
            author.password
        );
        if(!passwordIsValid){
            return res.status(401).send({ 
                accessToken:null,
                message: "Invalid password"    
            });
        }
        
        var token=jwt.sign({id:author.post_id},config.secret,{
            expiresIn:86400,
        });
        var authorities=[];
        for (let i=0;i<author.roles.length;i++){
            authorities.push("ROLE_"+author.roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id:author.post_id,
            name:author.name,
            email:author.email,
            roles:authorities,
            accessToken:token
        })
    })
}