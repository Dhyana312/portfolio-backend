require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = require("./models/Admin");

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to DB");

    await Admin.deleteMany({});

    const plainPassword = "KajuDida123";
    const hash = await bcrypt.hash(plainPassword, 10);

    await Admin.create({
      email: "kajalpandya@gmail.com",
      password: hash,
    });

    console.log("✅ ADMIN CREATED IN DB");
    process.exit();
  } catch (error) {
    console.error("❌ ERROR:", error);
    process.exit(1);
  }
}

createAdmin();