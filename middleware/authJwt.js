const jwt=require("jsonwebtoken");
const config=require("../config/authConfig");
const db=require("../Models")
const Author=db.author;
const Role=db.role;

verifyToken=(req,res,next)=>{
    let token=req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message: "Invalid token provided!"});
    }
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(403).send({message:"Unauthorized"})
        }
        req.userId=decoded.id;
        next();
    });
};

isAdmin=(req,res,next)=>{
    Author.findById(req.post_id).exec((err,user)=>{
        if(err){
            res.status(500).send({message:err});
            return;
        }
        Role.find({
            _id:{$in:author.roles}
        },
        (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
    
            for (let i = 0; i < roles.length; i++) {
              if (roles[i].name === "admin") {
                next();
                return;
              }
            }
    
            res.status(403).send({ message: "Require Admin Role!" });
            return;
          }
        );
        
    })
}

isModerator = (req, res, next) => {
    Author.findById(req.post_id).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.find(
        {
          _id: { $in: author.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
  
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }
  
          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        }
      );
    });
  };

  const authJwt={
      verifyToken,
      isAdmin,
      isModerator
  };

  module.exports=authJwt;