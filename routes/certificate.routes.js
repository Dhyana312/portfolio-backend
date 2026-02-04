const router = require("express").Router();
const Certificate = require("../models/Certificate");
const upload = require("../middleware/upload");

/* ===============================
   CREATE CERTIFICATE
================================ */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const cert = new Certificate({
      name: req.body.name,
      organization: req.body.organization,
      year: req.body.year,
      image: req.file
        ? `/uploads/certificates/${req.file.filename}`
        : null,
      published: false, // default
    });

    await cert.save();
    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===============================
   GET ALL CERTIFICATES
================================ */
router.get("/", async (req, res) => {
  const certs = await Certificate.find().sort({ createdAt: -1 });
  res.json(certs);
});

/* ===============================
   PUBLISH / UNPUBLISH
================================ */
router.patch("/:id/publish", async (req, res) => {
  try {
    const cert = await Certificate.findById(req.params.id);
    if (!cert) return res.status(404).json({ error: "Not found" });

    cert.published = !cert.published;
    await cert.save();

    res.json(cert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===============================
   DELETE CERTIFICATE
================================ */
router.delete("/:id", async (req, res) => {
  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ error: "Not found" });

    res.json({ message: "Certificate deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
