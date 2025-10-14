import express from "express";
import cors from "cors";
import tasksRouter from "./routes/tasks.js";

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api", tasksRouter);

// Simple test route
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});