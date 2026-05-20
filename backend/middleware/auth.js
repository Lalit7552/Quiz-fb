const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const User = require("../models/User");

const auth = (role) => async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role === "admin") {
      if (role && role !== "admin") return res.status(403).json({ message: "Access denied" });
      req.user = { role: "admin" };
      return next();
    }

    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Invalid user" });

    if (role && user.role !== role)
      return res.status(403).json({ message: "Access denied" });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
