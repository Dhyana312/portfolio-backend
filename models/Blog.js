const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    excerpt: String,
    content: String,

    image: String, // ✅ REQUIRED

    published: { type: Boolean, default: false },
    published_at: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
