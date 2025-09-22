
import { readFile, writeFile } from "fs/promises";
const filePath = new URL('../data/tasks.json', import.meta.url);


export async function getAllTasks() {
    try {
        const data = await readFile(filePath, 'utf-8');
        const raw = JSON.parse(data);
        return raw.map(obj => Task.parse(obj));

    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

export async function saveTasks(tasks) {
    const json = JSON.stringify(tasks, null, 2);
    await writeFile(filePath, json, 'utf-8');
}

export async function addTask(task) {
    const tasks = await getAllTasks();
    tasks.push(task);
    await saveTasks(tasks);
}

export async function updateTask(id, updates) {
    const tasks = await getAllTasks();
    const task = tasks.find(task => task.id === Number(id));

    if (!task)
        return false;

    // Updates Format: [ ["title", "New Title"], ["dueDate", "2025-09-20"] ]
    Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            if (key === "dueDate") {
                task.dueDate = new Date(value);
            } else {
                task[key] = value;
            }
        }
    });

    await saveTasks(tasks);
    return task;
}

export async function removeTask(id) {
    const tasks = await getAllTasks();
    const tasksToKeep = tasks.filter(task => task.id !== Number(id));
    if (tasksToKeep.length === tasks.length) return false; // no match
    await saveTasks(updated);
    return true;
}