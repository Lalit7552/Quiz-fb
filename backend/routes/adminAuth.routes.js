const express = require("express");
const jwt = require("jsonwebtoken");
const admin = require("../config/admin");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid admin credentials" });
});

module.exports = router;
