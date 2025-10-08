import Expense from "../models/Expense.js";
import { getAllExpenses, saveExpenses, addExpenses, updateExpense, removeExpense } from "../api/expenseApi.js";
import { askQuestion } from "./common.js"


export async function addExpensesCli(idGen) {
	const id = idGen.getNextId();

	const title = (await askQuestion("Enter Expense title: ")).trim();
	if (!title) {
		console.log("Expense title cannot be empty!");
		return;
	}

	const amountString = (await askQuestion("Enter expense amount: ")).trim();
	if (!amountString) {
		console.log("Amount cannot be empty!");
		return;
	}
	const amount = Number(amountString);

	const category = (await askQuestion("Enter category title: ")).trim();
	if (!category) {
		console.log("Category cannot be empty!");
		return;
	}

	const dateInput = (await askQuestion("Enter date (YYYY-MM-DD, leave blank if none): ")).trim();
	let date = null;
	if (dateInput !== "") {
		const d = new Date(dateInput);
		if (Number.isNaN(d.getTime())) {
			console.log("Invalid date format. Please use YYYY-MM-DD.");
			return;
		}
		date = d;
	}

	const newExpense = new Expense(id, title, amount, category, date);
	await addExpenses(newExpense);
	console.log(`Expense "${title}" added successfully with ID ${id}!`);
}


export async function listExpensesCli() {

	const expenses = await getAllExpenses();
	if (expenses.length === 0) {
		console.log("No expenses!");
		return;
	}

	expenses.forEach(e => {
		console.log(e.info);
	});

}

export async function removeExpensesCli() {

	const expenses = await getAllExpenses();
	if (expenses.length === 0) {
		console.log("No expenses!");
		return;
	}

	const expenseId = (await askQuestion("Enter expense ID: ")).trim();
	if (!expenseId) {
		console.log("ID cannot be empty!");
		return;
	}

	const id = Number(expenseId);
	if (!Number.isInteger(id)) {
		console.log("Please enter a valid numeric ID.");
		return;
	}

	const expenseExists = expenses.some(e => e.id === id);
	if (!expenseExists) {
		console.log(`No Expense with id ${id}.`);
		return;
	}

	const response = await removeExpense(id);
	if (response) {
		console.log(`Expense with ID-${id} removed successfully.`);
	}
}

export async function updateExpensesCli() {
	const expenses = await getAllExpenses();
	if (expenses.length === 0) {
		console.log("No expenses!");
		return;
	}

	const expenseId = (await askQuestion("Enter expense ID: ")).trim();
	if (!expenseId) {
		console.log("ID cannot be empty!");
		return;
	}

	const id = Number(expenseId);
	if (!Number.isInteger(id)) {
		console.log("Please enter a valid numeric ID.");
		return;
	}

	const expense = expenses.find(e => e.id === id);
	if (!expense) {
		console.log(`No Expense with id ${id}.`);
		return;
	}

	console.log("\n===Expenses Details===");
	console.log(`Current Title: ${expense.title}`);
	console.log(`Current Status: ${expense.amount}`);
	console.log(`Current Category: ${expense.category}`);
	console.log(`Current Due Date: ${expense.date}`);

	const newTitle = await askQuestion('Enter new Title (leave blank to keep current): ');
	const newStatus = await askQuestion('Enter new Status (leave blank to keep current): ');
	const newCategory = await askQuestion('Enter new Category (leave blank to keep current): ');
	const newDate = await askQuestion('Enter new Date (leave blank to keep current): ');

	const updates = {
		title: newTitle,
		status: newStatus,
		category: newCategory,
		date: newDate
	};

	const response = await updateExpense(id, updates);
	if (response) {
		console.log(`Expense with ID ${id} updated successfully!`);
	} else {
		console.log(`Failed to update Expense with ID ${id}.`);
	}

}

export async function filterByCategoryCli(testCategory = null) {
	// 	•	Fetch all expenses.
	const expenses = await getAllExpenses();
	if (expenses.length === 0) {
		console.log('No expense found');
	}

	const categoryInput = testCategory ? testCategory : (await askQuestion("Enter Category: ")).trim();
	if (!categoryInput) {
		console.log("Category cannot be empty!");
		return;
	}

	const filteredExpenses = expenses.filter(e => e.category.toLowerCase() === categoryInput.toLowerCase());
	if (filteredExpenses.length === 0) {
		console.log('No expenses found with that category');
		return;
	}

	console.log('===Search Results===');
	filteredExpenses.forEach(e => {
		console.log(e.info);
	});

	const totalSpent = filteredExpenses.reduce((acc, curr) => {
		return acc + curr.amount;
	}, 0);

	console.log(`-> Total spent in "${categoryInput}": $${totalSpent.toFixed(2)}`);

}


if (import.meta.url === `file://${process.argv[1]}`) {
	console.log("Running test for filterByCategoryCli()...\n");
	await filterByCategoryCli("personal"); // any test category you want
	process.exit(0);
}


// 5.	optional — Reports (after core is done)
// •	Filter by category/date range.
// •	Show total spending.