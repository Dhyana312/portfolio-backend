require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  await Admin.deleteMany({}); // optional cleanup

  const hash = await bcrypt.hash("admin123", 10);

  await Admin.create({
    email: "kajalPandya.md@gmail.com",
    password:hash,
  });

  console.log("✅ ADMIN CREATED IN DB");
  process.exit();
})();
