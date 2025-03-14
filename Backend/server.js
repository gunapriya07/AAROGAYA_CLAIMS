const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const routes = require("./routes");
const claimsRouter = require("./Route/claimsRouter");
const QuestionsRouter = require("./Route/QuestionRouter");
const cors = require('cors');


const app = express();
const PORT = 4001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api", routes); 
app.use("/claimapi", claimsRouter);
app.use("/questionapi",QuestionsRouter);

// Basic Routes
app.get("/", (req, res) => {
  res.send("ASAP Project - Endpoint!");
});

app.get("/ping", (req, res) => {
  res.send("Pong!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Check if MongoDB is connected
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

// Start Server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export server for testing
module.exports = server;