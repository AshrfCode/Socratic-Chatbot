export const layers = [
  "Broad Context",
  "Structure",
  "Dynamics",
  "Evaluation",
];

export const fakeMessages = [
  {
    sender: "bot",
    text: "Before we solve the problem, what is the main goal of the system?",
  },
  {
    sender: "user",
    text: "The goal is to help students develop systems thinking skills.",
  },
  {
    sender: "bot",
    text: "Good. Who are the main stakeholders affected by this system?",
  },
];

export const sessionInfo = {
  userName: "Student 01",
  group: "Experimental Group",
  currentLayer: "Broad Context",
  remainingTime: "18:42",
  hintsUsed: 1,
  unlockedGates: ["Goal defined", "Stakeholders identified"],
};

export const dashboardData = [
  {
    name: "Student 01",
    layer: "Broad Context",
    hints: 1,
    status: "In Progress",
  },
  {
    name: "Student 02",
    layer: "Dynamics",
    hints: 3,
    status: "Needs Support",
  },
  {
    name: "Student 03",
    layer: "Evaluation",
    hints: 2,
    status: "Completed",
  },
];