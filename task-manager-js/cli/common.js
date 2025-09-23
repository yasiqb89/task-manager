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

    // tasks = [{ id: 3 }, { id: 7 }, { id: 5 }]
    // map ->[3, 7, 5] -> Math.max(3, 7, 5) = 7 -> maxId = 7

    return idGenerator(maxId + 1);
}

