const express = require("express");
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectCreationRoutes")

dotenv.config();
connectDB();

const app = express();

app.use(express.json({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api", authRoutes,projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
