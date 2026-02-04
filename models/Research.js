const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema(
  {
    title: String,

    // ✅ NEW: researchers / authors
    authors: [String], // e.g. ["Dr. Kajal Pandya", "Dr. Krishna Pandey"]

    description: String,
    year: Number,
    status: {
      type: String,
      enum: ['ongoing', 'completed'],
      default: 'ongoing',
    },
    published: {
      type: Boolean,
      default: false,
    },

    abstract: {
      background: String,
      aim: String,
      methodology: String,
      results: String,
      conclusion: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Research', researchSchema);
