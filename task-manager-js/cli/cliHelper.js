import Task from "../models/Task.js";
import { addTask, getAllTasks, updateTask, removeTask } from "../api/taskApi.js";
import { askQuestion } from "./common.js";

// Add a new task
export async function addTaskCli(idGen) {
    console.log("\n=== Add a New Task ===");

    const title = await askQuestion("Enter task title: ");
    const dueDateInput = await askQuestion("Enter due date (YYYY-MM-DD, leave blank if none): ");
    const category = await askQuestion("Enter category (e.g., Work, Personal): ");
    const id = idGen.getNextId();
    const dueDate = dueDateInput ? new Date(dueDateInput) : null;

    const newTask = new Task(id, title, dueDate, "pending", category);

    await addTask(newTask);
    console.log(`Task "${title}" added successfully with ID ${id}!`);
}

// List all tasks
export async function listTasksCli() {
    const tasks = await getAllTasks();

    if (tasks.length <= 0) {
        console.log('No tasks to show');
        return;
    }

    console.log("\n=== Task List ===");
    tasks.forEach(task => {
        console.log(task.info)
        const overdueMark = task.isOverdue() ? "Overdue!" : '';
        console.log(`${task.info} ${overdueMark}`);
    });
}

// Update task
export async function updateTaskCli() {
    // TODO: ask for ID, ask for updates
    // Call updateTask()
    // Print results
}

// Remove task
export async function removeTaskCli() {
    // TODO: ask for ID
    // Call removeTask()
    // Print results
}