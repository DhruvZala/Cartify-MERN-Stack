const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const orderRoutes = require("./routes/orderRoutes");
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Base route
app.get("/", (req, res) => {
  res.send("Hello from the Product API!");
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server URL: http://localhost:${PORT}`);
});
