exports.allAccess=(req,res) => {
res.status(200).send("public content")
}

exports.authorBoard=(req,res) => {
    res.status(200).send("Author content")
}

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };