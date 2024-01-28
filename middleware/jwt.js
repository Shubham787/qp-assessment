const jwt = require("jsonwebtoken");

const jwtSign = (data) => {
  try {
    const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
    return token;
  } catch (error) {
    console.error("error signing JWT", error);
  }
};

const jwtVerifyAndDecode = (token) => {
  try {
    const isVerified = jwt.verify(token, process.env.JWT_SECRET);
    if (isVerified) {
      const decoded = jwt.decode(token, process.env.JWT_SECRET);
      return decoded;
    }
  } catch (error) {
    console.error("error decoding JWT", error);
  }
};

const jwtVerify = (req, res, next) => {
  try {
    const isVerified = jwt.verify(
      req.headers?.authorization,
      process.env.JWT_SECRET
    );
    const decoded = jwt.decode(
      req.headers?.authorization,
      process.env.JWT_SECRET
    );
    if (isVerified) {
      req.body.userId = decoded.id;
      next();
    } else {
      return res.status(401).send("You are unathorized");
    }
  } catch (error) {
    console.error("error decoding JWT", error);
  }
};

module.exports = {
  jwtSign,
  jwtVerifyAndDecode,
  jwtVerify,
};
