import Task from "../models/Task.js";
import { addTask, getAllTasks, updateTask, removeTask, saveTasks } from "../api/taskApi.js";
import { askQuestion } from "./common.js"

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
    console.log(tasks);

    if (tasks.length <= 0) {
        console.log('No tasks to show');
        return;
    }

    console.log("\n=== Task List ===");
    tasks.forEach(task => {
        const overdueMark = task.isOverdue() ? "Overdue!" : '';
        console.log(`${task.info} ${overdueMark}`);
    });
}

// Update task
export async function updateTaskCli() {

    const tasks = await getAllTasks();
    if (tasks.length === 0) {
        console.log('No tasks found to update');
    }

    console.log("\n=== Task List ===");
    tasks.forEach(t => {
        console.log(t.info);
    });

    const rawId = (await askQuestion('Enter ID (or q to cancel): ')).trim();
    if (rawId.toLowerCase() == 'q') {
        console.log('Cancelled.');
        return;
    }

    const task = tasks.find(t => t.id === Number(rawId));
    if (!task) {
        console.log(`No task found with ID ${rawId}`);
    }

    console.log("\nTask Details:");
    console.log(`Current Title: ${task.title}`);
    console.log(`Current Due Date: ${task.dueDate}`);
    console.log(`Current Status: ${task.status}`);
    console.log(`Current Category: ${task.category}`);


    const newTitle = await askQuestion('Enter new Title (leave blank to keep current): ');
    const newDueDate = await askQuestion('Enter new Due Date (leave blank to keep current): ');
    const newStatus = await askQuestion('Enter new Status (leave blank to keep current): ');
    const newCategory = await askQuestion('Enter new Category (leave blank to keep current): ');

    const updates = {
        title: newTitle,
        dueDate: newDueDate,
        status: newStatus,
        category: newCategory
    };

    const updatedTask = await updateTask(Number(rawId), updates);

    if (updatedTask) {
        console.log(`Task with ID ${rawId} updated successfully!`);
    } else {
        console.log(`Failed to update task with ID ${rawId}.`);
    }
}

// Remove task
export async function removeTaskCli() {
    const tasks = await getAllTasks();

    if (tasks.length === 0) {
        console.log("No tasks to remove");
        return;
    }

    console.log("\n=== Task List ===");
    tasks.forEach(t => {
        console.log(t.info);
    });

    const rawId = (await askQuestion('\nEnter Task ID (or q to cancel): ')).trim();
    if (rawId.toLowerCase() === 'q') {
        console.log('Cancelled.');
        return;
    }

    const id = Number(rawId);
    if (!Number.isInteger(id)) {
        console.log("Please enter a valid numeric ID.");
        return;
    }

    const taskExists = tasks.some(t => t.id === id);
    if (!taskExists) {
        console.log(`No task with id ${id}.`);
        return;
    }

    const ok = await removeTask(id);
    if (ok === false) {
        console.log(`Failed to delete task ${id}.`);
    } else
        console.log(`Task ${id} deleted successfully.`);
}

export async function reportStatusCountCli() {

    const tasks = await getAllTasks();

    if (tasks.length === 0) {
        console.log('No Tasks!');
        return;
    }
    //{ pending: 3, done: 2 }

    const counts = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
    }, {});

    console.log('\nStatus Report:');
    Object.entries(counts).forEach(([key, value]) => {
        console.log(`- ${key}: ${value}`);
    });
}

export async function listOverdueTasksCli() {

    const tasks = await getAllTasks();
    if (tasks.length === 0) {
        console.log('No Tasks!');
        return;
    }

    const overdueTasks = tasks.filter(task => task.isOverdue());

    if (overdueTasks.length === 0) {
        console.log(" No overdue tasks!");
        return;
    }

    console.log("\n=== Overdue Tasks ===");
    overdueTasks.forEach(task => {
        console.log(task.info);
    });
}

export async function filterTasksByCategoryCli() {

    const tasks = await getAllTasks();
    if (tasks.length == 0) {
        console.log('No tasks!');
        return;
    }

    const category = (await askQuestion('\nEnter Task Category (or q to cancel): ')).trim();
    if (category.toLowerCase() === 'q') {
        console.log('Cancelled.');
        return;
    }

    const filteredTasks = tasks.filter(t => t.category === category);

    if (!filteredTasks) {
        console.log(`No task found with category ${category}`);
        return;
    }

    console.log("\n=== Filtered Tasks ===");
    filteredTasks.forEach(t => {
        console.log(t.info);
    });
}