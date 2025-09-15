const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const protect = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
        success: false
      });
    }

    token = token.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = {
      userId: payload.userId,
      tenantId: payload.tenantId,
      role: payload.role
    };
    // console.log(req);
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
      error: err.message
    });
  }
};

module.exports = protect ;