const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://localhost:8081",
    "https://portfolio-frontend-rouge-psi.vercel.app",
    "https://portfolio-admin-dusky-theta.vercel.app"
  ],
  credentials: true,
}));


app.use(express.json()); // ✅ ONCE is enough
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ---------------- ROUTES ---------------- */
app.use("/api/blogs", require("./routes/blog.routes"));
app.use("/api/auth", require("./routes/auth.routes")); // ✅ ONLY ONCE
app.use("/api/research", require("./routes/research"));
app.use("/api/certificates", require("./routes/certificate.routes"));
app.use("/api", require("./routes/contact.route"));

/* ---------------- DATABASE ---------------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));
/* ---------------- ROOT ROUTE ---------------- */
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Running 🚀");
});
/* ---------------- SERVER ---------------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});