const mongoose = require("mongoose");

/*
  User represents one participant in the research experiment.

  Relationships:
  - One User can have many Sessions.
  - One User can have many Chats.
  - One User has one StudentProgress document.
*/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Student 01",
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    role: {
  type: String,
  enum: ["student", "researcher", "admin"],
  default: "student",
},

    group: {
      type: String,
      enum: ["Experimental Group", "Control Group"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);