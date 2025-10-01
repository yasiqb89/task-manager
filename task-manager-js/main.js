import { setupIdGenerator, askQuestion, closePrompt } from "./cli/common.js";
import { addTaskCli, listTasksCli, updateTaskCli, removeTaskCli, reportStatusCountCli, listOverdueTasksCli, filterTasksByCategoryCli, markTaskCompleteCli } from "./cli/cliHelper.js";


async function showMainMenu() {
    let exit = false;
    while (!exit) {
        console.log("\n=== Main Menu ===");
        console.log("1. Manage Tasks");
        console.log("2. Exit");

        const choice = await askQuestion("Choose option: ");

        switch (choice.trim()) {
            case "1":
                await showTaskMenu();
                break;
            case "2":
                exit = true;
                console.log("Goodbye!");
                break;
            default:
                console.log('Invalid option. Try again.');
        }
    }
    closePrompt();
}

async function showTaskMenu() {
    let back = false;
    const idGenTasks = await setupIdGenerator();

    while (!back) {
        console.log("\n=== Task Menu ===");
        console.log("1. Add Task");
        console.log("2. List Tasks");
        console.log("3. Update Tasks");
        console.log("4. Remove Tasks");
        console.log("5. Status Count");
        console.log("6. List Overdue Tasks");
        console.log("7. Filter Tasks by Categoryy");
        console.log("8. MArk Task as Complete");
        console.log("9. Go Back");

        const choice = await askQuestion("Choose option: ");

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
                await reportStatusCountCli();
                break;
            case "6":
                await listOverdueTasksCli();
                break;
            case "7":
                await filterTasksByCategoryCli();
                break;
            case "8":
                await markTaskCompleteCli();
            case "9":
                back = true;
                break;
            default:
                console.log('Invalid option. Try again.');
        }
    }
}

showMainMenu();
