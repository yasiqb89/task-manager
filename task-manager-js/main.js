import { closePrompt, askQuestion, manageExpenses, manageTasks } from "./cli/cliHelper.js";

async function showMenu() {
    console.log('\n=== Note App ===');
    console.log('1. Manage Tasks');
    console.log('2. Manage Expenses');
    console.log('3. Exit');

    const choice = await askQuestion('Enter choice: ');

    switch (choice.trim()) {
        case '1':
            await manageExpenses();
            break;
        case '2': await manageTasks();
            break;
        case '3':
            console.log('Goodbye');
            closePrompt();
            return;
        default:
            console.log('Invalid option. Try again.');
    }

    showMenu();

}

showMenu();