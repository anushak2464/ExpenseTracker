import { readData,writeData } from "../utils/filestore.js";
import { randomUUID } from "node:crypto";

export async function getAllExpenses() {
    return await readData();
    
}
export async function getExpenseById(id) {
    const expenses = await readData();
    return expenses.find(expense => expense.id == id);
}
export async function addExpense(expenseData) {
    const expenses = await readData();
    const newExpense = {
        id: randomUUID(),
        ...expenseData
    };
    expenses.push(newExpense);
    await writeData(expenses);
    return newExpense;   
}
export async function updateExpense(id, updatedData) {
    const expenses = await readData();
    const index = expenses.findIndex(
        expense => expense.id === id
    );
    if (index === -1) {
        return null;
    }
    expenses[index] = {
        ...expenses[index],
        ...updatedData,
        id
    };
    await writeData(expenses);
    return expenses[index];
}
export async function deleteExpense(id) {
    const expenses = await readData();
    const filteredExpenses = expenses.filter(
        expense => expense.id !== id
    );
    if (filteredExpenses.length === expenses.length) {
        return false;
    }
    await writeData(filteredExpenses);
    return true;
}
