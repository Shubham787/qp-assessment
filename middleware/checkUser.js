const jwt = require("./jwt");

const checkUser = (req, res, next) => {
  try {
    const token = req.headers?.authorization;

    if (token) {
      const decoded = jwt.jwtVerifyAndDecode(token);
      if (decoded?.role === "admin") {
        next();
      } else {
        return res.status(401).send("Unathorized");
      }
    } else {
      res.status(400).send("token required");
    }
  } catch (error) {
    console.log("error in checking User Type", error);
  }
};

module.exports = checkUser;
