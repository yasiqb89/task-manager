import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

export function closePrompt() {
    rl.close();
}

export function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));

}

export async function manageTasks() {

}

export async function manageExpenses() {

}