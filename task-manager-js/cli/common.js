import readline from "readline";
import idGenerator from "../idGenerator.js";
import { getAllTasks } from "../api/taskApi.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));

}

export function closePrompt() {
    rl.close();
}

export async function setupIdGenerator() {
    const tasks = await getAllTasks();
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    return idGenerator(maxId + 1);
}

