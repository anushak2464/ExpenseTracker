import { getAllExpenses } from '../models/expensemodel.js';
import { convertExpensesToCsv } from '../utils/csvexport.js';

export async function exportExpenses(req, res) {
    const expenses = await getAllExpenses();

    const csvData = convertExpensesToCsv(expenses);

    res.writeHead(200, {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="expenses.csv"'
    });

    res.end(csvData);
}