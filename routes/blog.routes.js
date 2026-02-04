const router = require("express").Router();
const Blog = require("../models/Blog");
const upload = require("../middleware/upload");
/* CREATE BLOG */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const blog = new Blog({
      title: req.body.title,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      published: req.body.published === "true",
      published_at:
        req.body.published === "true" ? new Date() : null,
      image: req.file ? `/uploads/blogs/${req.file.filename}` : null,
    });

    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* UPDATE BLOG */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const update = {
      title: req.body.title,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      published: req.body.published === "true",
      published_at:
        req.body.published === "true" ? new Date() : null,
    };

    if (req.file) {
      update.image = `/uploads/blogs/${req.file.filename}`;
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* PUBLISH / UNPUBLISH */
router.put("/:id/publish", async (req, res) => {
  const blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      published: req.body.published,
      published_at: req.body.published ? new Date() : null,
    },
    { new: true }
  );
  res.json(blog);
});

/* GET BLOGS */
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

/* ================= DELETE BLOG ================= */
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET BLOG BY SLUG (PUBLIC)
router.get("/slug/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({
      slug: req.params.slug,
      published: true,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
