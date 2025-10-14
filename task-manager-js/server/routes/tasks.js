import express from "express";
import { getAllTasks, getTaskById } from "../../api/taskApi.js";

const router = express.Router();

// Get all tasks
router.get("/tasks", async (req, res) => {
    const tasks = await getAllTasks();
    res.json(tasks);
});

// Get one task by ID
router.get("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);
    const task = await getTaskById(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
});

// Some custom endpoint
router.get("/abc", (req, res) => {
    res.json({ message: "This is the /abc route" });
});

export default router;
