const jwt = require("jsonwebtoken");
const validation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "unauthorised" });
  }
  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.PRIVATE_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = validation;
