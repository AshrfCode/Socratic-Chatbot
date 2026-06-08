const User = require("../models/User");
const Chat = require("../models/Chat");
const Session = require("../models/Session");

async function getDefaultData() {
  let student = await User.findOne({ email: "student01@test.com" });

  if (!student) {
    student = await User.create({
      name: "Student 01",
      email: "student01@test.com",
      role: "student",
    });
  }

  let chat = await Chat.findOne({
    studentId: student._id,
    isActive: true,
  });

  if (!chat) {
    chat = await Chat.create({
      studentId: student._id,
      title: "SystemThinker Chat",
    });
  }

  let session = await Session.findOne({
    studentId: student._id,
    chatId: chat._id,
  });

  if (!session) {
    session = await Session.create({
      studentId: student._id,
      chatId: chat._id,
      group: "Experimental Group",
      currentLayer: "Broad Context",
      hintsUsed: 1,
      unlockedGates: ["Goal defined", "Stakeholders identified"],
      status: "In Progress",
    });
  }

  return { student, chat, session };
}

module.exports = getDefaultData;