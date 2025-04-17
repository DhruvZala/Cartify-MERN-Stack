const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Base route
app.get("/", (req, res) => {
  res.send("Hello from the Product API!");
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
