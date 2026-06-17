const User = require("../models/User");
const Chat = require("../models/Chat");
const Session = require("../models/Session");
const StudentProgress = require("../models/StudentProgress");

/*
  This helper creates default data for development.

  In a real login system, we would get the logged-in user from authentication.
  For this academic project, we create one default student automatically.

  Created documents:
  1. User
  2. Chat
  3. Session
  4. StudentProgress

  MongoDB references:
  - Chat.studentId points to User._id
  - Session.studentId points to User._id
  - Session.chatId points to Chat._id
  - StudentProgress.studentId points to User._id
*/

function assignRandomGroup() {
  return Math.random() < 0.5 ? "Experimental Group" : "Control Group";
}

async function getDefaultData() {
  let student = await User.findOne({ email: "student01@example.com" });

  if (!student) {
    student = await User.create({
      name: "Student 01",
      email: "student01@example.com",
      role: "student",
      group: assignRandomGroup(),
    });
  }

  let chat = await Chat.findOne({ studentId: student._id });

  if (!chat) {
    chat = await Chat.create({
      studentId: student._id,
      title: "Systems Thinking Chat",
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
      group: student.group,
      currentLayer: "Broad Context",
      hintsUsed: 0,
      unlockedGates: [],
      remainingTime: "20:00",
    });
  }

  let progress = await StudentProgress.findOne({ studentId: student._id });

  if (!progress) {
    progress = await StudentProgress.create({
      studentId: student._id,
      currentLayer: session.currentLayer,
      hintsUsed: session.hintsUsed,
      progress: 25,
      status: "Active",
      group: student.group,
    });
  }

  return {
    student,
    chat,
    session,
    progress,
  };
}

module.exports = getDefaultData;