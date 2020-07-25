require('dotenv').config();
const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  }
  // { timestamps: { createdAt: "created_at" } }
);





userSchema.methods = {
  authenticate: function (password) { // pas de fonction flechée !!  pour pouvoir utiliser this
    // return passwordHash.verify(password, this.password);
    console.log('AUTH PWD: ', password);
    console.log('THIS PWD:', this.password);
    // console.log('BCRYPT: ', Bcrypt.compareSync(password, this.password));
    // return
    return Bcrypt.compareSync(password, this.password);
  },
  // getToken: () => {
  //   return jwt.encode(this, process.env.SECRET);
  // },
  generateAuthToken: function() {
    // console.log('THIS', this);
  const token = jwt.sign({ _id: this._id}, process.env.SECRET, { expiresIn: '1h' });
  return token;
}
};

module.exports = mongoose.model("User", userSchema);
