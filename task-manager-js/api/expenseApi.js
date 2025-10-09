import { readFile, writeFile } from "fs/promises";
import Expense from "../models/Expense.js";
import { simulateDelay } from "../cli/common.js"


const filePath = new URL('../data/expenses.json', import.meta.url);

export async function getAllExpenses({ noDelay = false } = {}) {
    try {
        const data = await readFile(filePath, 'utf-8');
        const raw = JSON.parse(data);
        if (!noDelay) await simulateDelay(2000);
        return raw.map(obj => Expense.parse(obj));

    } catch (error) {
        if (error.code === 'ENOENT') return [];
        throw error;
    }
}

export async function saveExpenses(expenses) {
    const json = JSON.stringify(expenses, null, 2);
    await writeFile(filePath, json, 'utf-8');
}

export async function addExpenses(expense) {
    const expenses = await getAllExpenses();
    expenses.push(expense);
    await saveExpenses(expenses);
}


export async function updateExpense(id, updates) {
    const expenses = await getAllExpenses();
    const expense = expenses.find(e => Number(e.id) === Number(id));
    if (!expense)
        return false;

    const patch = Array.isArray(updates) ? Object.fromEntries(updates) : (updates ?? {}); // If null or undefined use an empty object
    const ALLOWED = new Set(["title", "amount", "category", "date", "status", "notes"]); // Whitelist fields that are allowed 

    for (const [key, value] of Object.entries(patch)) {
        if (!ALLOWED.has(key))
            continue;
        if (value === undefined || value === "")
            continue;   // allow null if you want to clear
        if (key === "amount")
            expense.amount = Number(value);
        else if (key === "date") {
            const d = value ? new Date(value) : null;
            if (d && Number.isNaN(d.getTime())) {
                console.log("Invalid date");
                continue;
            }
            expense.date = d;
        } else {
            expense[key] = value;
        }
    }

    await saveExpenses(expenses);
    return expense;
}


export async function removeExpense(id) {
    const expenses = await getAllExpenses();
    const keepExpenses = expenses.filter(e => Number(e.id) !== Number(id));
    if (keepExpenses.length === expenses.length) {
        console.log('Expense does not exist');
        return;
    }

    await saveExpenses(keepExpenses);
    return true;

    // const updated = expenses.toSpliced
    //     ? expenses.toSpliced(idx, 1)
    //     : expenses.slice(0, idx).concat(expenses.slice(idx + 1));
}
