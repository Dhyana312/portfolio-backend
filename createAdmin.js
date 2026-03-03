require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

(async () => {
  await Admin.deleteMany({}); // optional cleanup

  const plainPassword = "KajuDida123"; // ← choose clean password

  const hash = await bcrypt.hash(plainPassword, 10);

  await Admin.create({
    email: "kajalpandya@gmail.com", // lowercase is important
    password: hash,
  });

  console.log("✅ ADMIN CREATED IN DB");
  process.exit();
})();