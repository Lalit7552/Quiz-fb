// Load environment variables
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Use MONGO_URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// ===== Connect to MongoDB =====
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// ===== Routes =====
// Auth routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/adminAuth.routes"));
app.use("/api/admin", require("./routes/adminUser.routes"));
app.use("/api/admin/question", require("./routes/adminQuestion.routes"));
app.use("/api/admin/category", require("./routes/adminCategory.routes"));
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/admin/dashboard", require("./routes/adminDashboard.routes"));
// Contact routes
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/contact-inquiries", require("./routes/contactInquiry.routes"));
// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
