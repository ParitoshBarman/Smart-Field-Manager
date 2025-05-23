const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

// OR - Configure CORS with specific options
app.use(cors({
    origin: "*", // Allow all domains (Use specific domains for better security)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"] // Allowed headers
}));
app.use(express.json());

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
