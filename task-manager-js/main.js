import { setupTaskIdGenerator, askQuestion, closePrompt, setupExpenseIdGenerator } from "./cli/common.js";
import { addTaskCli, listTasksCli, updateTaskCli, removeTaskCli, reportStatusCountCli, listOverdueTasksCli, filterTasksByCategoryCli, markTaskCompleteCli, listGroupedTasksCli, searchTasksCli } from "./cli/taskCliHelper.js";
import { addExpensesCli, listExpensesCli, removeExpensesCli, updateExpensesCli, filterByDateRangeCli, filterByCategoryCli } from "./cli/expenseCliHelper.js";

async function showMainMenu() {
    let exit = false;
    while (!exit) {
        console.log("\n=== Main Menu ===");
        console.log("1. Manage Tasks");
        console.log("2. Manage Expenses")
        console.log("3. Exit");

        const choice = await askQuestion("\nChoose option: ");

        switch (choice.trim()) {
            case "1":
                await showTaskMenu();
                break;
            case "2":
                await showExpensesMenu();
                break;
            case "3":
                exit = true;
                console.log("Goodbye!");
                break;
            default:
                console.log('Invalid option. Try again.');
        }
    }
    closePrompt();
}

async function showExpensesMenu() {
    let back = false;
    const idGenExpenses = await setupExpenseIdGenerator();

    while (!back) {
        console.log("\n=== Expenses Menu ===");
        console.log("1. Add Expense");
        console.log("2. List Expenses");
        console.log("3. Update Expense");
        console.log("4. Remove Expense");
        console.log("5. Filter by Category");
        console.log("6. Filter by Date Range");
        console.log("7. Show Total Spending");
        console.log("8. Go Back");

        const choice = await askQuestion("\nChoose option: ");

        switch (choice.trim()) {
            case "1":
                await addExpensesCli(idGenExpenses);
                break;
            case "2":
                await listExpensesCli();
                break;
            case "3":
                await updateExpensesCli();
                break;
            case "4":
                await removeExpensesCli();
                break;
            case "5":
                await filterByCategoryCli();
                break;
            case "6":
                await filterByDateRangeCli();
                break;
            case "7":
                back = true;
                break;
            default:
                console.log('Invalid option. Try again.');
        }
    }
}

async function showTaskMenu() {
    let back = false;
    const idGenTasks = await setupTaskIdGenerator();

    while (!back) {
        console.log("\n=== Task Menu ===");
        console.log("1. Add Task");
        console.log("2. List Tasks");
        console.log("3. Update Tasks");
        console.log("4. Remove Tasks");
        console.log("5. Status Count");
        console.log("6. List Overdue Tasks");
        console.log("7. Filter Tasks by Categoryy");
        console.log("8. Mark Task as Complete");
        console.log("9. List Grouped Tasks");
        console.log("10. Search Task");
        console.log("11. Go Back");

        const choice = await askQuestion("\nChoose option: ");

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
                break;
            case "9":
                await listGroupedTasksCli();
                break;
            case "10":
                await searchTasksCli();
                break;
            case "11":
                back = true;
                break;
            default:
                console.log('Invalid option. Try again.');
        }
    }
}

showMainMenu();
