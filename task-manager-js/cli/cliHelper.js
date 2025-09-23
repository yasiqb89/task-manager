import readline from "readline";
import idGenerator from "../idGenerator.js";
import { getAllTasks, addTask, removeTask, updateTask, saveTasks } from "../api/taskApi.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export function closePrompt() {
    rl.close();
}

const tasks = await getAllTasks();
const maxId = tasks.length > 0 ? Math.max(...tasks.map(n => n.id)) : 0;
console.log(maxId);
const idGen = idGenerator(maxId + 1);

export function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));

}

export async function addTaskCli(askQuestion, idGen) {

}

export async function manageTasks() {

}

export async function manageExpenses() {

}

