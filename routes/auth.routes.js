const express = require("express");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const router = express.Router(); // ⭐ THIS WAS MISSING

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("EMAIL RECEIVED:", email);
  console.log("PASSWORD RECEIVED:", password);

  const admin = await Admin.findOne({ email });
  console.log("ADMIN FOUND:", admin);

  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  console.log("PASSWORD MATCH:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({ success: true });
});

module.exports = router; // ⭐ ALSO REQUIRED
