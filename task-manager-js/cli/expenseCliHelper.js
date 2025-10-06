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
	expenses.forEach(e => {
		console.log(e.info);
	});

}

export async function removeExpensesCli() {
	//Todo

	// 3.	removeExpenseCli()
	// •	Ask for an ID, confirm it exists, call removeExpense(id).

}

export async function updateExpensesCli() {
	//Todo

	// 4.	updateExpenseCli()
	// •	Ask which expense to edit.
	// •	Prompt for new fields (blank = keep current).
	// •	Call updateExpense(id, updates).

}


// 5.	optional — Reports (after core is done)
// •	Filter by category/date range.
// •	Show total spending.