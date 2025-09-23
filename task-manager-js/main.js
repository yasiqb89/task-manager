import { setupIdGenerator, askQuestion, closePrompt } from "./cli/common.js";
import { addTaskCli, listTasksCli, updateTaskCli, removeTaskCli } from "./cli/cliHelper.js";


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
    console.log("3. Update Tasks");
    console.log("4. Remove Tasks");
    console.log("5. Back");

    const choice = await askQuestion("Choose: ");

    switch (choice.trim()) {
        case "1":
            await addTaskCli(idGenTasks);
            break;
        case "2":
            await listTasksCli();
            break;
        case "3":
            await updateTaskCli();
            break;
        case "4":
            await removeTaskCli();
            break;
        case "5":
            return; // ends Task menu, goes back to Main menu
    }

    // Go back to Task menu
    showTaskMenu();
}

showMainMenu();