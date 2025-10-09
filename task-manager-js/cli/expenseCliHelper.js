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

	const count = filteredExpenses.length;
	const totalSpent = calculateTotal(filteredExpenses);

	showSummary(`Category: ${categoryInput}`, count, totalSpent);
}


export async function filterByDateRangeCli(testStart = null, testEnd = null) {
	const expenses = await getAllExpenses();
	if (expenses.length === 0) {
		console.log('No expense found');
	}

	const startDate = testStart ? testStart : (await askQuestion("Enter start date (YYYY-MM-DD): ")).trim();
	const endDate = testEnd ? testEnd : (await askQuestion("Enter end date (YYYY-MM-DD): ")).trim();

	const start = new Date(startDate);
	const end = new Date(endDate);
	const filteredByDates = expenses.filter(e => e.date >= start && e.date <= end);

	if (filteredByDates.length === 0) {
		console.log("No expenses with in that range");
		return;
	}

	console.log("\n=== Expenses in Range ===");
	filteredByDates.forEach(e => console.log(e.info));

	const count = filteredByDates.length;
	const totalSpent = calculateTotal(filteredByDates);

	showSummary(`From ${start.toLocaleDateString()} to ${end.toLocaleDateString()})`, count, totalSpent);

	//console.log(`\Total spent from ${start.toLocaleDateString()} to ${end.toLocaleDateString()}: $${totalSpent.toFixed(2)} - Total items: ${count}`);

}

export async function summaryByCategory() {
	const expenses = await getAllExpenses();
	if (expenses.length === 0) {
		console.log('No expense found');
	}

	// (A || B) shorthand version of A ? A : B.

	const summary = expenses.reduce((acc, curr) => {
		acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
		return acc;
	}, {});

	Object.entries(summary).forEach(([category, total]) => {
		console.log(`- ${category}: $${total.toFixed(2)}`);
	});

}


export async function totalSpendingCli() {
	const expenses = await getAllExpenses();
	if (expenses.length === 0) {
		console.log('No expense found');
	}

	const totalSpent = expenses.reduce((acc, curr) => {
		return acc += curr.amount;
	}, 0);

	console.log('\n=== Expense Summary ===')
	console.log(
		`Total Expenses: ${expenses.length}`,
		`\nTotal Amount Spent: $${totalSpent.toFixed(2)}`
	);

	showSummary('Expenses', expenses.length, totalSpent);
}


function calculateTotal(expenses) {
	return expenses.reduce((acc, curr) => acc + curr.amount, 0);
}


function showSummary(label, count, total) {
	console.log(`\n=== Total Spending (${label}) ===`);
	console.log(`${count} items, total $${total.toFixed(2)}`);
}


// For testing individual functions in this file 
if (import.meta.url === `file://${process.argv[1]}`) {
	console.log("Running test for filterByCategoryCli()...\n");
	//await filterByCategoryCli("personal");
	//await filterByDateRangeCli("2025-09-01", "2025-09-30");
	//await totalSpendingCli();
	await summaryByCategory();
	process.exit(0);
}