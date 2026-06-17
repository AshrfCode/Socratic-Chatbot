const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const sessionRoutes = require("./routes/sessionRoutes");
const chatRoutes = require("./routes/chatRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const layerRoutes = require("./routes/layerRoutes");
const questionnaireRoutes = require("./routes/questionnaireRoutes");
const controlRoutes = require("./routes/controlRoutes");
const researcherRoutes = require("./routes/researcherRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("SystemThinker AI Backend is running");
});

app.use("/api/session", sessionRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/layers", layerRoutes);
app.use("/api/questionnaires", questionnaireRoutes);
app.use("/api/control", controlRoutes);
app.use("/api/researcher", researcherRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});