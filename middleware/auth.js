const jwt = require("jsonwebtoken");
const User = require("../Models/Users");

const checkAuth = async (req, res, next) => {
  try {
    
    let token;
    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization;
    }
    if (!token) {
      return res
        .status(401)
        .json({ error: "No token provided, authorization denied" });
    }
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid/Expired token" });
  }
};

module.exports = checkAuth;