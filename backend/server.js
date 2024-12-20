const express = require("express");
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const partRoutes = require("./routes/partRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectMemberRoutes = require("./routes/projectMemberRoutes");
const taskAssignmentRoutes = require("./routes/taskAssignmentRoutes");
const inboxRoutes = require("./routes/inboxRoutes")

dotenv.config();
connectDB();

const app = express();

app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true, 
}));

app.use("/auth", authRoutes); //routes to register and log in
app.use("/projects", projectRoutes); //routes to all related to all projects
app.use("/project", partRoutes, taskRoutes, projectMemberRoutes, taskAssignmentRoutes) //routes to all related to a project
app.use("/inbox", inboxRoutes) //routes to inbox

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));