const {authJwt}=require("../middleware");
const controller=require("../Controllers/authorController");

module.exports=function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token,Origin,Content-Type,Accept"
        );
        next();
    })
    app.get("/api/test/all",controller.allAccess)
    app.get("/api/test/user",[authJwt.verifyToken],controller.authorBoard)
    app.get("/api/test/mod",[authJwt.verifyToken,authJwt.isModerator],controller.moderatorBoard);

    app.get(
        "/api/test/mod",
        [authJwt.verifyToken,authJwt.isAdmin],
        controller.adminBoard
        )
}