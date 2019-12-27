const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const UserProfileSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true
    },
    password: { type: String, default: "123456" },
    createdBy: {
      type: Mongoose.Schema.ObjectId,
      default: null
    },
    isActive: { type: Boolean, default: true },
    isDelete: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const UserProfileModel = Mongoose.model("userProfile", UserProfileSchema);

module.exports = UserProfileModel;
