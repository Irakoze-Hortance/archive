const {verifySignup}=require("../middleware");
const controller=require("../Controllers/authController")

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignup.checkDuplicatePostIdOrEmail,
            verifySignup.checkRolesExisted
        ],
        controller.signup
        );
    
    app.post("/api/auth/signin",controller.signin);
};