// const mongoose = require("mongoose");

// const CertificateSchema = new mongoose.Schema(
//   {
//     name: String,
//     organization: String,
//     year: Number,
//     image: String,
//     published: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Certificate", CertificateSchema);
const mongoose = require("mongoose");

const CertificateSchema = new mongoose.Schema(
  {
    name: String,
    organization: String,
    year: Number,
    image: String,
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Certificate", CertificateSchema);
