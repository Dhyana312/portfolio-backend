// const router = require("express").Router();
// const Research = require("../models/Research");

// /* CREATE */
// router.post("/", async (req, res) => {
//   try {
//     const research = new Research(req.body);
//     await research.save();
//     res.json(research);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* GET ALL */
// router.get("/", async (req, res) => {
//   const research = await Research.find().sort({ createdAt: -1 });
//   res.json(research);
// });

// /* GET SINGLE (DETAIL PAGE) */
// router.get("/:id", async (req, res) => {
//   const research = await Research.findById(req.params.id);
//   if (!research) return res.status(404).json({ error: "Not found" });
//   res.json(research);
// });

// /* UPDATE */
// router.put("/:id", async (req, res) => {
//   const updated = await Research.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true }
//   );
//   res.json(updated);
// });

// /* DELETE */
// router.delete("/:id", async (req, res) => {
//   await Research.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// module.exports = router;
const router = require('express').Router();
const Research = require('../models/Research');

// CREATE
router.post('/', async (req, res) => {
  const r = await Research.create(req.body);
  res.json(r);
});

// GET ALL
router.get('/', async (req, res) => {
  res.json(await Research.find());
});

// GET ONE
router.get('/:id', async (req, res) => {
  res.json(await Research.findById(req.params.id));
});

// UPDATE
// GET ALL (only published for public site)
router.get('/', async (req, res) => {
  const research = await Research.find({ published: true }).sort({
    createdAt: -1,
  });
  res.json(research);
});


// DELETE
router.delete('/:id', async (req, res) => {
  await Research.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
