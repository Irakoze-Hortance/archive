const db=require("../Models")
const ROLES=db.ROLES;
const Author=db.author;

checkDuplicatePostIdOrEmail=(req,res,next)=>{
    //check post id and
    Author.findOne({   
        post_id:req.body.post_id
    }).exec((err,author)=>{
        if(err){
            res.status(500).send({message:err.message});
            return;
        }
        if(author){
            res.status(400).send({message:"Post is already in use"});
            return;
        }

        Author.findOne({
            email: req.body.email
          }).exec((err, author) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
      
            if (author) {
              res.status(400).send({ message: "Failed! Email is already in use!" });
              return;
            }
      
            next();
          });
        });
      };

      checkRolesExisted = (req, res, next) => {
        if (req.body.roles) {
          for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
              res.status(400).send({
                message: `Failed! Role ${req.body.roles[i]} does not exist!`
              });
              return;
            }
          }
        }
      
        next();
      };
      
      const verifySignUp = {
        checkDuplicateUsernameOrEmail,
        checkRolesExisted
      };
      
      module.exports = verifySignUp;