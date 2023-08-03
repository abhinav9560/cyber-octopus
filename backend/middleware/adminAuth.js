const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  if (req.headers["authorization"]) {
    let token = req.headers["authorization"];
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.privateKey, function (err, decoded) {
      if (err) {
        res.status(401).json({
          status: false,
          message: "Unauthorized",
        });
      }
      if (decoded) {
        req.doc = decoded._id;
        res.set("token", token);
        res.setHeaders;
        next();
      }
    });
  } else {
    res.status(401).json({
      status: false,
      message: "Unauthorized",
    });
  }
};

module.exports = Auth;
