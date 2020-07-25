require('dotenv').config();
const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    blacklisted_token: {
      type: String,
    }
  },
  {timestamps: true}
);

tokenSchema.index({createdAt: 1},{expires: 3600}); //OK POUR 30 60 3600 secondes efface l'un apres l'autre pas tres precis
module.exports = mongoose.model("Token", tokenSchema);
