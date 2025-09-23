import { setupIdGenerator, askQuestion, closePrompt } from "./cliHelpers/common.js";
import { addTaskCli, listTasksCli, updateTaskCli, removeTaskCli } from "./cliHelpers/taskHelpers.js";

const idGenTasks = await setupIdGenerator();

async function showMainMenu() {
    console.log("\n=== Main Menu ===");
    console.log("1. Manage Tasks");
    console.log("2. Exit");

    const choice = await askQuestion("Choose: ");

    switch (choice.trim()) {
        case "1":
            await showTaskMenu(); // user goes into Task Menu
            break;
        case "2":
            console.log("Goodbye!");
            closePrompt();
            return;
    }
    // Go back to main menu
    showMainMenu();
}

async function showTaskMenu() {
    console.log("\n=== Task Menu ===");
    console.log("1. Add Task");
    console.log("2. List Tasks");
    console.log("3. Back");

    const choice = await askQuestion("Choose: ");

    switch (choice.trim()) {
        case "1":
            await addTaskCli(idGen);
            break;
        case "2":
            await listTasksCli();
            break;
        case "3":
            return; // ends Task menu, goes back to Main menu
    }

    // Go back to Task menu
    showTaskMenu();
}

showMainMenu();